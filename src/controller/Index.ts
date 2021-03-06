import { GoodsModel } from "../models/GoodsModel";
import { UserModel } from "../models/UserModel";
import express from "express";
import { Response, Request, NextFunction } from "express";


const index  = express(); 

index.get('/',async (req: Request, res: Response) => {
    let goods = new GoodsModel();
    let ret = await goods.getInfo()
    res.send(ret);
});

export default index;