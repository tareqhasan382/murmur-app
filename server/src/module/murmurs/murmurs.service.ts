import {ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MurmursService {
    constructor(private prisma: PrismaService) {}

    async getTimeline(userId: number,page: number, limit: number) {
      const murmurs = await this.prisma.murmur.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, profileImage: true } },
          likes: {
            select: { userId: true, user: { select: { id: true, name: true, profileImage: true } } },
          },
          _count: { select: { likes: true } },
        },
      });

      const formattedData = murmurs.map((m) => ({
        id: m.id,
        content: m.content,
        userId: m.userId,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        likesCount: m._count.likes,
        isLiked: m.likes.some((l) => l.userId === userId), // current user liked?
        likedUsers: m.likes.map((l) => l.userId),           // full list of users
        user: {
          id: m.user.id,
          name: m.user.name,
          profileImage: m.user.profileImage,
        },
      }));

      return formattedData;
    }

  create(userId: number, content: string) {
    return this.prisma.murmur.create({
      data: { content, userId },
    });
  }

  async delete(userId: number, id: number) {
    const murmur = await this.prisma.murmur.findUnique({
      where: { id },
    });

    if (!murmur) {
      throw new NotFoundException('Murmur not found');
    }

    if (murmur.userId !== userId) {
      throw new ForbiddenException('You can only delete your own murmur');
    }

    return this.prisma.murmur.delete({ where: { id } });
  }

  async like(userId: number, murmurId: number) {
    try {
      return await this.prisma.likes.create({
        data: { userId, murmurId },
      });
    } catch (error) {
      if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
      ) {
        // ✅ User already liked this murmur
        throw new ConflictException("You already liked this murmur");
      }

      throw error; // unknown error
    }
  }
}
