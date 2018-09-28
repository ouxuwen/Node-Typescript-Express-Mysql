import express from "express";
import { Response, Request, NextFunction } from "express";
import index from './controller/Index';

import { myLogger } from "./util/logger";
const app = express();
app.use(myLogger);



app.set("port", process.env.PORT || 3000);

app.get("/",  (req: Request, res: Response) => {
    res.send('Hello world');
});

app.use("/index", index);





export default app;