import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'John Updated' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: '+880987654321' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ example: 'https://cdn.app/avatar.png' })
    @IsOptional()
    @IsString()
    profileImage?: string;
}
