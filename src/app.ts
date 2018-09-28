import express from "express";
import { Response, Request, NextFunction } from "express";
import { UserController } from './controller/User';
import { GoodsController } from './controller/Goods';
import index from './controller/Index';
import { myLogger } from "./util/logger";
const app = express();
app.use(myLogger);



app.set("port", process.env.PORT || 3000);

app.get("/", async (req: Request, res: Response) => {
    let user = new UserController();
    let ret = await user.getPerson()
    res.send(ret);
});

app.use("/index", index);





export default app;