import { ZikStockError } from '../zikstock-error/zikstock-error';
import { Zikresource } from './zikresource';
import { ZikresourceDAO } from './zikresource-dao';

export class ZikresourceBLO {

    zikResourceDAO: ZikresourceDAO;

    constructor() {
        this.zikResourceDAO = new ZikresourceDAO();
    }

    async createZikresource(data: any): Promise<Zikresource> {
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

    async deleteOneZikresource(id: string): Promise<void> {
        let zikresource = await this.getOneZikresourceById(id);
        if (zikresource == null) {
            throw new ZikStockError("404-1");
        }
        let deleted = await this.zikResourceDAO.delete(zikresource);
        if (!deleted) {
            throw new ZikStockError("500-4");
        }
    }

    async updateOneZikresource(id: string, data:any): Promise<Zikresource|undefined> {
        let zikResourceUpdated = await this.zikResourceDAO.updateOne(id, this.buildZikresourceInstance(data));
        return zikResourceUpdated;
    }

    private buildZikresourceInstance(data: any): Zikresource {
        let zikresource = new Zikresource(data.url, data.title);
        if (data.type) { zikresource.type = data.type; }
        if (data.artist) { zikresource.artist = data.artist; }
        if (data.tags) { zikresource.tags = data.tags; }
        return zikresource;
    }

}