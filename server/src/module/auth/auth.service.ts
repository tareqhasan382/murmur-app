import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  RequestResetCodeDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/create-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus } from '@prisma/client';
import { generateOtpCode, hashOtpCode } from '../../utils/generateOtpCode';
import { MailerService } from '@nestjs-modules/mailer';

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private mailerService: MailerService,
  ) {}

  /** Register a new user */
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new ConflictException('User with this email already exists.');
    if (dto.password !== dto.confirmPassword) throw new BadRequestException('Passwords do not match.');

    const hashedPassword = await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUND!));

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          phone: dto.phone ?? null,
          profileImage: dto.profileImage ?? null,
          role: UserRole.USER,
        },
      });

      const { password, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      console.error('Error creating user:', err);
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  /** Login user */
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== UserStatus.ACTIVE)
      throw new UnauthorizedException('Your account is inactive');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const payload = {
      sub: user.id,
      email: user.email!,
      role: user.role as string,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN as any || '1d',
    });

    const { password, passwordResetToken, passwordResetExpires, ...safeUser } = user;

    return {
      accessToken,
      user: safeUser,
    };
  }


  /** Change password */
  async changePassword(email: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');

    const hashed = await bcrypt.hash(dto.newPassword, parseInt(process.env.SALT_ROUND!));
    await this.prisma.user.update({ where: { email }, data: { password: hashed } });

    return { message: 'Password changed successfully' };
  }

  /** Request OTP code for password reset */
  async requestResetCode(dto: RequestResetCodeDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('User not found');

    const code = generateOtpCode();
    const hashedCode = await hashOtpCode(code);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await this.prisma.user.update({
      where: { email: dto.email },
      data: { passwordResetToken: hashedCode, passwordResetExpires: expiresAt },
    });

    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Reset Password Code',
      text: `Your OTP code is ${code}. It will expire in 5 minutes.`,
    });

    return { message: 'Reset code sent' };
  }

  /** Verify OTP code */
  async verifyResetCode(dto: VerifyResetCodeDto) {
    const otpRecord = await this.prisma.user.findFirst({
      where: { email: dto.email, verified: false, passwordResetToken: { not: null } },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord || !otpRecord.passwordResetExpires || otpRecord.passwordResetExpires < new Date())
      throw new BadRequestException('Invalid or expired code');

    const isValid = await bcrypt.compare(dto.code, otpRecord.passwordResetToken!);
    if (!isValid) throw new BadRequestException('Incorrect code');

    await this.prisma.user.update({
      where: { email: dto.email },
      data: { verified: true, passwordResetToken: null, passwordResetExpires: null },
    });

    return { message: 'OTP verified successfully' };
  }

  /** Reset password */
  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword) throw new BadRequestException("Passwords don't match");

    const verified = await this.prisma.user.findFirst({
      where: { email: dto.email, verified: true },
      orderBy: { createdAt: 'desc' },
    });
    if (!verified) throw new BadRequestException('OTP not verified');

    const hashed = await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUND!));
    await this.prisma.user.update({
      where: { email: dto.email },
      data: { password: hashed, verified: false },
    });

    return { message: 'Password reset successful' };
  }
}
