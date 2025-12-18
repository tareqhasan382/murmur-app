import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { GetMe } from '../user/dto/request-with-user.interface';
import { FollowDto } from './dto/follow.dto';
import { FollowerResponseDto } from './dto/follower-response.dto';
import express from 'express';
import sendResponse from "../../utils/sendResponse.js";

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Follow a user' })
  @ApiResponse({ status: 201, description: 'User followed successfully' })
  async followUser(
    @Req() req: GetMe,
    @Res() res: express.Response,
    @Body() body: FollowDto,
  ) {
    const followerId = Number(req.user.id);
    const data = await this.followsService.follow(followerId, body.userId);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User followed successfully',
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiResponse({ status: 200, description: 'User unfollowed successfully' })
  async unfollowUser(
    @Req() req: GetMe,
    @Res() res: express.Response,
    @Body() body: FollowDto,
  ) {
    const followerId = Number(req.user.id);
    const data = await this.followsService.unfollow(followerId, body.userId);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User unfollowed successfully',
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get my followers and following' })
  @ApiResponse({ status: 200, type: FollowerResponseDto })
  async getMyFollowers(
    @Req() req: GetMe,
    @Res() res: express.Response,
  ) {
    const userId = Number(req.user.id);
    const data = await this.followsService.getFollowers(userId);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Followers and following retrieved successfully',
      data,
    });
  }
}
