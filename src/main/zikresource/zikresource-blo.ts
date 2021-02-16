import { ZikStockError } from '../zikstock-error/zikstock-error';
import { Zikresource } from './zikresource';
import { ZikresourceDAO } from './zikresource-dao';

export class ZikresourceBLO {

    zikResourceDAO: ZikresourceDAO;

    constructor() {
        this.zikResourceDAO = new ZikresourceDAO();
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
        let zikResource = await this.zikResourceDAO.save(this.buildZikresourceInstance(data));
        return zikResource;
    }

    async getZikresources(): Promise<Zikresource[]> {
        let result = await this.zikResourceDAO.retrieveAll();
        if (!result) {
            result = [];
        }
        return result;
    }

    async getOneZikresourceById(id: string): Promise<Zikresource|null> {
        let result = await this.zikResourceDAO.retrieveOneById(id);
        if (!result) {
            result = null;
        }
        return result;
    }

    async deleteOneZikresource(data: any): Promise<void> {
        await this.zikResourceDAO.delete(this.buildZikresourceInstance(data));
    }

    async updateOneZikresource(id: string, data:any): Promise<Zikresource|undefined> {
        let zikResourceUpdated = await this.zikResourceDAO.updateOne(id, this.buildZikresourceInstance(data));
        return zikResourceUpdated;
    }

    private buildZikresourceInstance(data: any): Zikresource {
        let zikresource = new Zikresource(data.url, data.title);
        zikresource.type = data.type;
        zikresource.artist = data.artist;
        zikresource.tags = data.tags;
        return zikresource;
    }

}