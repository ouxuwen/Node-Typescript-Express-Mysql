import winston from "winston";
import { Logger } from "winston";
import { ENVIRONMENT } from "./secrets";
import fs from 'fs';
import { format } from './DateFormat';
import { Response, Request, NextFunction } from "express";


const logName = `log/${format("yyyy-MM-dd", new Date())}/${format("yyyyMMddhh", new Date())}.log`;

function checkFilePromise() {
    return new Promise((resolve, reject) => {
        fs.access(logName, fs.constants.F_OK, (err) => {
            console.log(`${logName} ${err ? `创建日志${logName}` : '存在'}`);
            if (err) {
                fs.mkdirSync(`log/${format("yyyy-MM-dd", new Date())}`)
                reject(err)
            } else {
                resolve(true)
            }
        });
    })
}

async function checkLogDir() {
    let res = await checkFilePromise();
    console.log('check file')
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
        ...req.headers
    }));

    next()
}

export {
    logger,
    checkLogDir,
    myLogger
};

