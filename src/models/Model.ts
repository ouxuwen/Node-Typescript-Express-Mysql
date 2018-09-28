import mysql from 'mysql';
import { Pool } from 'mysql';
import { db } from './DBConfig';

export class Model {
    protected connection: Pool;
    protected database: string;

    constructor() {
        this.connection = mysql.createPool(db);
        this.database = db.database;
    };

}



