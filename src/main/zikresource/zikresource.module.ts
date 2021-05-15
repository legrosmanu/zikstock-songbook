import { ZikresourceService } from './zikresource.service';
import { ZikresourceController } from './zikresource.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ZikresourceController],
  providers: [ZikresourceService],
})
export class ZikresourceModule {}
