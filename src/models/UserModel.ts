import { BaseModel } from './BaseModel';
export class UserModel extends BaseModel {
    protected table: string = 'mss_user';

    constructor() {
        super();
    }
}

