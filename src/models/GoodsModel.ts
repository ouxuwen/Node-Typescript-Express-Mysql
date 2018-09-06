import { BaseModel } from './BaseModel';
export class GoodsModel extends BaseModel {
    protected table: string = 'mss_goods';

    constructor() {
        super();
    }
}

