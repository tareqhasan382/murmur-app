import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MurmursService {
    constructor(private prisma: PrismaService) {}

    async getTimeline(page: number, limit: number) {
    return this.prisma.murmur.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: { select: { likes: true } },
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });
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
  
  like(userId: number, murmurId: number) {
    return this.prisma.likes.create({
      data: { userId, murmurId },
    });
  }
}
