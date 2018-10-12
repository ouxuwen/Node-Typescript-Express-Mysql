import express from "express";
import { Response, Request, NextFunction } from "express";
import index from './controller/Index';

import { myLogger, checkLogDir } from "./util/logger";
const app = express();

//创建日志文件夹
checkLogDir();
app.use(myLogger);

// process.env.PORT  ||
app.set("port", 3000 );

app.use("/index", index);





export default app;