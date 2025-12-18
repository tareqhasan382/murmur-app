import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}
  
  // --- Follow a user ---
  async follow(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new ForbiddenException("You cannot follow yourself");
    }

    // Check if already following
    const exists = await this.prisma.follows.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (exists) {
      throw new ForbiddenException("You are already following this user");
    }

    return this.prisma.follows.create({
      data: { followerId, followingId },
    });
  }

  // --- Unfollow a user ---
  async unfollow(followerId: number, followingId: number) {
    try {
      return await this.prisma.follows.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
    } catch (error) {
      // Prisma throws an error if record does not exist
      throw new NotFoundException("You are not following this user");
    }
  }

 // --- Get followers and following ---
  async getFollowers(userId: number) {
    const followers = await this.prisma.follows.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });

    const following = await this.prisma.follows.findMany({
      where: { followerId: userId },
      include: { following: true },
    });

    return {
      followers: followers.map(f => ({
        id: f.follower.id,
        name: f.follower.name,
        profileImage: f.follower.profileImage,
      })),
      following: following.map(f => ({
        id: f.following.id,
        name: f.following.name,
        profileImage: f.following.profileImage,
      })),
    };
  }
}
