import winston from "winston";
import { Logger } from "winston";
import { ENVIRONMENT } from "./secrets";
import fs from 'fs';
import { format } from './DateFormat';
import { Response, Request, NextFunction } from "express";


const logName = `log/${format("yyyyMMdd", new Date())}/${format("yyyyMMddhh", new Date())}.log`;

// 检查文件夹是否存在
function checkFilePromise() {
    return new Promise((resolve, reject) => {
        fs.access(`log/${format("yyyyMMdd", new Date())}`, fs.constants.F_OK, (err) => {
            console.log(`log/${format("yyyyMMdd", new Date())} ${err ? `----------created the folder ${logName}-----------------` : '----------log folder exists----------'}`);
            if (err) {
                fs.mkdirSync(`log/${format("yyyyMMdd", new Date())}`);
                console.log(err)
                reject(err)
            } else {
                resolve(true)
            }
        });
    })
}

async function checkLogDir() {
    console.log('Start checking  if  log folder exists ------------------------------------------')
    let res = await checkFilePromise();
    console.log(res)
}


// logger初始化
const logger = new (Logger)({
    transports: [
        new (winston.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston.transports.File)({ filename: logName, level: "debug" })
    ]
});

// logger初始化
if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

// logger中间件
const myLogger = (req: Request, res: Response, next: NextFunction) => {
    checkLogDir();
    logger.info(JSON.stringify({
        ...req.headers,
        body:req.body,
        params:req.params,
        query:req.query
    }));

    next()
}

export {
    logger,
    checkLogDir,
    myLogger
};

