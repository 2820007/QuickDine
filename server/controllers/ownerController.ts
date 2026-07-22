import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.js";

//Get owners restaurant
//GET/api/owner/restaurant

export const getOwnerRestaurant=async (req:AuthRequest,res:Response):Promise<void>=>{
    try {
        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }
}


//Create owners restaurant (submitted to pending)
//POST/api/owner/restaurant

export const createOwnerRestaurant=async (req:AuthRequest,res:Response):Promise<void>=>{
    try {
        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }
}


//Update owners restaurant
//PUT/api/owner/restaurant

export const updateOwnerRestaurant=async (req:AuthRequest,res:Response):Promise<void>=>{
    try {
        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }
}

//Get Bookings for owner restaurant
//GET/api/owner/bookings

export const getOwnerBookings=async (req:AuthRequest,res:Response):Promise<void>=>{
    try {
        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }
}


//Update status of  owners bookings
//PUT/api/owner/bookings/:id/status

export const updateBookingsStatus=async (req:AuthRequest,res:Response):Promise<void>=>{
    try {
        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }
}