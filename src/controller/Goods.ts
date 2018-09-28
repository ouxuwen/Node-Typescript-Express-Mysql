import { GoodsModel } from "../models/GoodsModel";
import express from "express";
import { Response, Request, NextFunction } from "express";


export class GoodsController extends GoodsModel
{
    constructor(){
        super();
    }
}