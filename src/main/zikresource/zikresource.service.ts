import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { Zikresource } from './dto/zikresource.dto';

@Injectable()
export class ZikresourceService {
  constructor(
    @InjectRepository(Zikresource)
    private readonly zikresourcesRepository: MongoRepository<Zikresource>,
  ) {}

  async createZikresource(zikresource: Zikresource): Promise<Zikresource> {
    return zikresource;
  }

  async getZikresources(): Promise<Zikresource[]> {
    return this.zikresourcesRepository.find();
  }

  async getZikresource(id: ObjectID): Promise<Zikresource> {
    return this.zikresourcesRepository.findOne({ _id: id });
  }

  async updateZikresource(
    id: ObjectID,
    zikresource: Partial<Zikresource>,
  ): Promise<Zikresource> {
    const zikresourceUpdated = new Zikresource(zikresource);
    this.zikresourcesRepository.update(id, zikresourceUpdated);
    return zikresourceUpdated;
  }

  async deleteZikresource(id: ObjectID): Promise<void> {
    await this.zikresourcesRepository.delete({ _id: id });
  }
}
