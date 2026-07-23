import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
//connect to mongodb
await connectDB()

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 9000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});



// auth 

app.use("/api/auth",authRouter)
//restaurant 
app.use("/api/restaurant",restaurantRouter)
//Booking

app.use("/api/bookings",bookingRouter)

//Restaurant owner
app.use("/api/owner",ownerRouter)

//admin
app.use("/api/admin",adminRouter)


//Global error handler

app.use((err:Error,req:Request,res:Response, next:NextFunction)=>{

    console.error("Unhandle error:",err)
    res.status(500).json({
        message:err.message || "Interval server error",
        stack:process.env.NODE_ENV ==="production" ? undefined :err.stack
    })

})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});