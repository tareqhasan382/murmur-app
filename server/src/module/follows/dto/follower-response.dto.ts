import { ApiProperty } from '@nestjs/swagger';

export class UserSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  profileImage?: string;
}

export class FollowerResponseDto {
  @ApiProperty({ type: [UserSummaryDto] })
  followers: UserSummaryDto[];

  @ApiProperty({ type: [UserSummaryDto] })
  following: UserSummaryDto[];
}
