
import { Model } from './Model';
import { logger } from "../util/logger";
import { resolve } from 'url';
import { reject } from 'async';
export class BaseModel extends Model {
    protected table: string;


    constructor() {
        super();
    }

    /**
     * @field 查询的字段 多个字段','隔开
     * @condition 条件 条件多值用','隔开
     * @order 按啥排序
     * @sort 正反序 ' DESC ' : ' ASC '
     */
    public getInfo(field?: string, condition?: any, order?: string, sort?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.getConnection((err, conn) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message);
                    reject(err);
                    return
                }
                let fields = field ? field : '*';
                let where = this.buildCondition(condition);
                // 生成的sql语句
                let sql = `SELECT ${fields} from ${this.table} ${where} ${order ? ' order by ' + order : ''}  ${sort ? sort : ''}`;
                logger.info(`SQL select statements: ${sql}`);
                this.connection.query(sql, (errs, result) => {
                    if (errs) {
                        reject(errs)
                        logger.error(`Using select error : ${errs.message}`);
                    }
                    logger.info(`Using select result : ${JSON.stringify(result)}`);
                    resolve(result);
                })
            })
        })
    }


    /**
     * 保存数据
     * @param field 存入表的对象
     * @param condition 有条件时，做更新操作
     */
    public save(field: any, condition?: any): Promise<any> {
        logger.info(`--------------------Using Save-----------------------`);
        let set = '';
        let where = '';
        let method = 'INSERT INTO ';
        for (let key in field) {
            set += `${key}=${field[key]},`
        }
        set = set.replace(/,$/, '');
        if (condition) {
            where = this.buildCondition(condition);
            method = "UPDATE ";
        }
        let sql = `${method} ${this.table} SET ${set} ${where}`;
        logger.info(`SQL ${method}  statements: ${sql}`);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (errs, result) => {
                if (errs) {
                    reject(errs)
                    logger.info(`Using ${method}  error : ${errs.message}`);
                }
                logger.info(`Using ${method}  result : ${JSON.stringify(result)}`);
                resolve(result);
            })
        })
    }

    /**
     * 删除操作
     * @param condition 
     */
    public delete(condition?: any): Promise<any> {
        logger.info(`--------------------Using delete-----------------------`);
        let where = this.buildCondition(condition);
        let sql = `DELETE form ${this.table} ${where}`
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (errs, result) => {
                if (errs) {
                    reject(errs)
                    logger.info(`Using DELETE error : ${errs.message}`);
                }
                logger.info(`Using DELETE result : ${JSON.stringify(result)}`);
                resolve(result[0]);
            })
        })
    }



    /**
     * 获取计数
     * @param condition 
     */
    public count(condition?: any): Promise<any> {
        logger.info(`--------------------Using count-----------------------`);
        return this.getInfo('count(*)', condition);
    }


    /**
     * 获取表字段
     */
    public getField(): Promise<any> {
        let sql = `select COLUMN_NAME from INFORMATION_SCHEMA.Columns where table_name = '${this.table}' and table_schema = '${this.database}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (errs, result) => {
                if (errs) {
                    reject(errs)
                    logger.info(`Using select error : ${errs.message}`);
                }
                logger.info(`Using select result : ${JSON.stringify(result)}`);
                resolve(result);
            })
        })
    }



    /**
     * 生成查询条件
     * @param condition 条件
     */
    private buildCondition(condition?: any): string {
        let where = '';
        if (condition && Object.keys(condition).length > 0) {
            where += 'where ';
            for (let key in condition) {
                if (typeof (condition[key]) == 'string' && condition[key].split(',').length > 1) {
                    let cArr: string[] = condition[key].split(',');
                    where += '( ';
                    cArr.forEach(ele => {
                        where += ` ${key} = ${ele} or`
                    })
                    where = where.replace(/\sor$/, ' ');
                    where += ' ) and';
                } else {
                    where += ` ${key} = ${condition[key]} and`
                }
            }
            where = where.replace(/\sand$/, ' ');
        }
        return where;
    }

}