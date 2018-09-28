import { BaseModel } from './BaseModel';
export class UserModel extends BaseModel {
    protected table: string = 'ns_user';

    constructor() {
        super();
    }
}

