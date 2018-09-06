import { UserModel } from "../models/UserModel";
import { Response, Request, NextFunction } from "express";
export class UserController extends UserModel{
    constructor(){
        super();
    }

    getPerson() {
        return this.getField();
    }


    async  saves(){
        let res = await  this.save({
            username:4,userpwd:4,email:5,headpic:4,regtime:4,regip:4,ustatus:4,
        },{id:26});

        return res;
    }
}