import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {JwtStrategy} from "../module/auth/strategy/jwt.strategy";

@Global()
@Module({
    providers: [PrismaService, JwtStrategy],
    exports: [PrismaService],
})
export class PrismaModule {}