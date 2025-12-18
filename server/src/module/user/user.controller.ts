import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import express from 'express';
import sendResponse from "../../utils/sendResponse.js";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as requestWithUserInterface from '../user/dto/request-with-user.interface';
// import { GetMe } from './dto/request-with-user.interface';
import type { GetMe } from './dto/request-with-user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.userService.create(createUserDto);
    // }

    @Get()
    @ApiOperation({summary: 'Get all users'})
    async findAll(@Res() res: express.Response) {
        const data = await this.userService.findAll();
        return sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: 'User retrieved successfully',
            data,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-me')
    @ApiOperation({summary: 'Get user by ID'})
    async getMe(
        @Req() req: GetMe,
        @Res() res: express.Response,
    ) {
        const userId = req.user.id;
        //console.log("userId-------------->", userId);
        const data = await this.userService.findOne(+userId);
        return sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: 'User retrieved successfully',
            data,
        });
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update user'})
    @ApiBody({type: UpdateUserDto})
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
        @Res() res: express.Response,
    ) {
        const data = await this.userService.update(+id, dto);
        return sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: 'User updated successfully',
            data,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('')
    @ApiOperation({summary: 'Delete user'})
    async remove(
        @Req() req: GetMe,
        @Res() res: express.Response,
    ) {
        const userId = req.user.id;
        const data = await this.userService.remove(+userId);
        return sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: 'User deleted successfully',
            data,
        });
    }
    @Get(':id')
    @ApiOperation({summary: 'Get user by ID'})
    async findOne(
        @Param('id') id: string,
        @Res() res: express.Response,
    ) {
        const data = await this.userService.findOne(+id);
        return sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: 'User retrieved successfully',
            data,
        });
    }
}
