import { ZikStockError } from '../zikstock-error/zikstock-error';
import { Zikresource } from './zikresource';
import { ZikresourceDAO } from './zikresource-dao';

export class ZikresourceBLO {

    zikResourceDAO: ZikresourceDAO;

    constructor(zikresourceDAO: ZikresourceDAO) {
        this.zikResourceDAO = zikresourceDAO;
    }

    async createZikresource(data: any) {
        // Prerequisites:
        // 1. must have at least an url and a title
        if (data == null || data.url == null || data.title == null) {
            throw new ZikStockError("400-1");
        }
        // 2. not more than 10 tags
        if (data.tags && data.tags.length > 10) {
            throw new ZikStockError("400-2");
        }
        // Save the zikresource on database
        await this.zikResourceDAO.save(this.buildZikresourceInstance(data));
    }

    async getZikresources(): Promise<Zikresource[]> {
        return await this.zikResourceDAO.retrieveAll();
    }

    async getOneZikresourceById(id: string): Promise<Zikresource|null> {
        return await this.zikResourceDAO.retrieveOneById(id);
    }

    async deleteOneZikresource(data: any): Promise<void> {
        await this.zikResourceDAO.delete(this.buildZikresourceInstance(data));
    }

    async updateOneZikresource(id: string, data:any) {
        await this.zikResourceDAO.updateOne(id, this.buildZikresourceInstance(data));
    }

    private buildZikresourceInstance(data: any): Zikresource {
        let zikresource = new Zikresource(data.url, data.title);
        zikresource.type = data.type;
        zikresource.artist = data.artist;
        zikresource.tags = data.tags;
        return zikresource;
    }

}