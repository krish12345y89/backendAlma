import { NextFunction,Request, Response } from "express";

export class ErrorSend extends Error{
    statusCode:number;
    isMendatory:boolean;
    isLogical:boolean;

    constructor(message:string,statusCode:number,isLogical?:boolean,isMendatory?:boolean){
        super(message)
        this.statusCode=statusCode;
        this.isMendatory=isMendatory;
        this.isLogical=isLogical;
    }
}

export const errorMiddleware=async(err:ErrorSend,req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(err)
        res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
    }
    catch(error:any){
        console.log(error)
    }
}