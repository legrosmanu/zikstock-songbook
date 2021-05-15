import { Body, Controller, Post } from '@nestjs/common';
import { Zikresource } from './dto/zikresource.dto';
import { ZikresourceService } from './zikresource.service';

@Controller('/api/zikresources')
export class ZikresourceController {
  constructor(private readonly zikresourceService: ZikresourceService) {}

  @Post()
  async createZikresource(
    @Body() zikresource: Zikresource,
  ): Promise<Zikresource> {
    return this.zikresourceService.createZikresource(zikresource);
  }
}
