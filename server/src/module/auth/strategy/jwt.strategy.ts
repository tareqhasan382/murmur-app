import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {jwtConstants} from '../../../common/jwt.constants';
import {PrismaService} from "../../../prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private prisma: PrismaService) {
        if (!jwtConstants.secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret!,
        });
    }

    // payload is what you signed inside AuthService (sub, email, role)
    async validate(payload: any) {
        // Optionally validate that user still exists / is active
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub, },
        });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.status !== 'ACTIVE') {
            throw new UnauthorizedException('User is inactive');
        }

        return user; // attaches to request.user
    }
}