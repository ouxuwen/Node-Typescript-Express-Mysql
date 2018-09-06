import express from "express";
import { Response, Request, NextFunction } from "express";
import { UserController } from './controller/User';
import { GoodsController } from './controller/Goods';
const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", async (req: Request, res: Response) => {
    let user = new UserController();
    // user.getFirstPerson().then(ret => {
    //     res.send(ret)
    // }).catch(err => {
    //     res.send(err)
    // })
    let ret = await user.getPerson()
    res.send(ret);
});

app.get("/goods", (req: Request, res: Response) => {
    let goods = new GoodsController();
    goods.getInfo().then(ress => {
        res.send(ress)
    }).catch(err => {
        res.send(err)
    })
});

async function save(res: Response) {
    // let user = new UserController();
    // let ret = await user.saves();
    // res.send(ret)
}




export default app;