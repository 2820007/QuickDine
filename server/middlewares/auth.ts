import { IUser, User } from "../models/userModel.js";
import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request{
    user?:IUser | null
}

export const protect=async (req:AuthRequest,res:Response, next:NextFunction):Promise<void>=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {

            token=req.headers.authorization.split(" ")[1]

            //verify token

            const decoded=jwt.verify(token, process.env.JWT_SECRET!) as {id:string}
            const user=await User.findById(decoded.id).select("_password")
            if(!user){
                res.status(401).json({message:"Not authorized, user not found"})
            }

            req.user=user
            next()
            
        } catch (error) {
            console.error("Auth middleware error:", error)
            res.status(401).json({message:"Not authorized, token failed"})
            return

            
        }
    }

    if(!token){
        res.status(401).json({message:"Not authorized, no found"})
    }
}



export const adminOnly=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    if(req.user && req.user.role ==="admin"){
        next()
    }else{
         res.status(401).json({message:"Access denied, admin role required"})
        
    }
}


export const ownerOnly=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    if(req.user && (req.user.role ==="owner" || req.user.role ==="admin")){
        next()
    }else{
         res.status(401).json({message:"Access denied, restaurant owner role required"})
        
    }
}