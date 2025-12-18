import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';

@Module({
  controllers: [MurmursController],
  providers: [MurmursService],
})
export class MurmursModule {}
