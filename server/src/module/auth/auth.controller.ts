
import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  RequestResetCodeDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/create-auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import express from 'express';
import sendResponse from "../../utils/sendResponse.js";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  @ApiOperation({summary: 'Register User'})
  @ApiResponse({status: 201, description: 'Registered User successfully.'})
  @ApiBody({type: RegisterDto})
  async register(@Body() dto: RegisterDto, @Res() res: express.Response) {
    const data = await this.authService.register(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User created successfully.',
      data,
    });
  }

  @Post('login')
  @ApiOperation({summary: 'Login User'})
  @ApiResponse({status: 201, description: 'LoggedIn User successfully.'})
  @ApiBody({type: LoginDto})
  async login(@Body() dto: LoginDto, @Res() res: express.Response) {
    const data = await this.authService.login(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User LoggedIn successfully.',
      data,
    });
  }

  // change password
  @Patch('change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: express.Request, @Res() res: express.Response) {
    const result = await this.authService.changePassword("test@gmail.com", dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password changed',
      data: result,
    });
  }

  // forget and reset password
  @Post('request-reset-code')
  async requestResetCode(@Body() dto: RequestResetCodeDto, @Res() res: express.Response) {
    const result = await this.authService.requestResetCode(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Reset code sent',
      data: result,
    });
  }


  @Post('verify-reset-code')
  async verifyResetCode(@Body() dto: VerifyResetCodeDto, @Res() res: express.Response) {
    const result = await this.authService.verifyResetCode(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'OTP verified',
      data: result,
    });
  }


  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Res() res: express.Response) {
    const result = await this.authService.resetPassword(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password reset successful',
      data: result,
    });
  }
}
