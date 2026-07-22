import { Response } from "express"
import { AuthRequest } from "../middlewares/auth.js"
import { Restaurant } from "../models/restaurantModel.js"
import { Booking } from "../models/bookingModele.js"

//create a new booking
//POST/api/bookings
//@access private

export const createBookings=async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
        const {restaurantId,date,time,guest,occasions,specialRequest}=req.body
        if(!restaurantId || !date || !time || !guest){
            res.status(400).json({message:"Please provide all required reservation details"})
            return
        }

        //check if restaurant exist
        const restaurant=await Restaurant.findById(restaurantId)
        if(!restaurant){
            res.status(400).json({message:"Restaurant not found"})
            return

        }

        //verify restaurant is approved

        if(restaurant.status !=="approved"){
            res.status(400).json({message:"Reservation are not open for this restaurant."})
            return

        }

        //verify seats availability

        const requestedGuest=Number(guest)
        const existingBookings=await Booking.find({
            restaurant:restaurantId,
            date:new Date(date),
            time,
            status:"confirmed"
        })

        const bookedSeats=existingBookings.reduce((sum,b)=>sum+b.guest,0)
        const totalSeats=restaurant.totalSeats || 20
        const availableSeats=totalSeats-bookedSeats
        if(requestedGuest >availableSeats){
            res.status(400).json({message:`Unable to reserve. only ${availableSeats} seats are available for this time slot.`})
            return
        }

        const booking=await Booking.create({
            user:req.user?._id,
            restaurant:restaurantId,
            date:new Date(date),
            time,
            guest:Number(guest),
            occasions,
            specialRequest,
            status:"confirmed"
        })

        //Populate restaurant info before returning

        const populateBooking=await  booking.populate("restaurant","name location image address")
        res.status(201).json(populateBooking)


    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }

}


//Get logged user  booking
//GET/api/bookings/my
//@access private

export const getMyBookings=async(req:AuthRequest,res:Response):Promise<void>=>{
    try {

        const bookings=await Booking.find({user:req.user?._id}).populate("restaurant", "name location image address slug").sort({date:-1, time: -1})

        res.json(bookings)
        

        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }

}



//Cancel a booking
//PUT/api/bookings/:id/cancel
//@access private

export const cancelBookings=async(req:AuthRequest,res:Response):Promise<void>=>{
    try {

        const booking=await Booking.findById(req.params.id)
        if(!booking){
            res.status(404).json({message:"Booking not found"})
            return

        }

        //verify user owns the booking
        if(booking.user.toString() !== req.user?._id.toString()){
            res.status(400).json({message:"Not authorize to cancel this  booking"})
            return
        }

        booking.status="cancelled"
        await booking.save()
        const populateBooking=await booking.populate("restaurant","name location image address")
        res.json(populateBooking)

        
    } catch (error:any) {
        console.error(error)
        res.status(400).json({message:error.message})
        
    }

}