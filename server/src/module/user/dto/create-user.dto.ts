import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'StrongPassword123' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ example: '+880123456789' })
    @IsOptional()
    @IsString()
    phone?: string;
}
