import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMurmurDto {
@ApiProperty({example: "Just finished my first NestJS project!", description: 'Content of the murmur' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
