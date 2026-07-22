import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { cancelBookings, createBookings, getMyBookings } from "../controllers/bookingController.js";

const bookingRouter=Router()

bookingRouter.post("/", protect,createBookings)
bookingRouter.get("/my", protect,getMyBookings)
bookingRouter.put("/:id/cancel", protect,cancelBookings)

export default bookingRouter