import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimelineQueryDto } from './dto/timeline-query.dto';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { MurmurResponseDto } from './dto/murmur-response.dto';
import { ResponseDto } from './dto/response.dto';
import type { GetMe } from '../user/dto/request-with-user.interface';
import sendResponse from '../../utils/sendResponse.js';
import express from 'express';

@ApiTags('Murmurs')
@Controller('murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) {}

  // --- GET TIMELINE ---
  @Get('murmurs')
  @ApiOperation({ summary: 'Get murmurs timeline' })
  @ApiResponse({ status: 200, type: ResponseDto, description: 'Timeline retrieved' })
  async getTimeline(
    @Res() res: express.Response,
    @Query() query: TimelineQueryDto,
  ) {
    const data = await this.murmursService.getTimeline(query.page ?? 1, query.limit ?? 10);

    const formattedData = data.map(m => ({
      id: m.id,
      content: m.content,
      userId: m.userId,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
      likesCount: m._count.likes,
      user: {
        id: m.user.id,
        name: m.user.name,
        profileImage: m.user.profileImage,
      },
    }));

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Timeline retrieved successfully',
      data: formattedData,
    });
  }

  // --- CREATE MURMUR ---
  @UseGuards(JwtAuthGuard)
  @Post('me/murmurs')
  @ApiOperation({ summary: 'Create a murmur' })
  @ApiResponse({ status: 201, type: ResponseDto, description: 'Murmur created' })
  async createMurmur(
    @Req() req: GetMe,
    @Res() res: express.Response,
    @Body() body: CreateMurmurDto,
  ) {
    const userId = Number(req.user.id);
    const data = await this.murmursService.create(userId, body.content);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Murmur created successfully',
      data,
    });
  }

  // --- DELETE MURMUR ---
  @UseGuards(JwtAuthGuard)
  @Delete('me/murmurs/:id')
  @ApiOperation({ summary: 'Delete a murmur' })
  @ApiResponse({ status: 200, type: ResponseDto, description: 'Murmur deleted' })
  async deleteMurmur(
    @Req() req: GetMe,
    @Res() res: express.Response,
    @Param('id') id: string,
  ) {
    const userId = Number(req.user.id);
    const data = await this.murmursService.delete(userId, Number(id));

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Murmur deleted successfully',
      data,
    });
  }

  // --- LIKE MURMUR ---
  @UseGuards(JwtAuthGuard)
  @Post('murmurs/:id/like')
  @ApiOperation({ summary: 'Like a murmur' })
  @ApiResponse({ status: 201, type: ResponseDto, description: 'Murmur liked' })
  async likeMurmur(
    @Req() req: GetMe,
    @Res() res: express.Response,
    @Param('id') id: string,
  ) {
    const userId = Number(req.user.id);
    const data = await this.murmursService.like(userId, Number(id));

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Murmur liked successfully',
      data,
    });
  }
}
