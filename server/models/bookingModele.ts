
import {model, Schema,Document,Types} from "mongoose"
import crypto from "crypto"


export interface IBooking extends Document{
    user:Types.ObjectId
    restaurant:Types.ObjectId
    date:Date
    time:string
    guest:number
    occasions?:string
    specialRequest?:string
    status:"confirmed" | "cancelled" | "completed"
    bookingId:string
    createdAT:Date
    updatedAt:Date
}

const bookingSchema=new Schema<IBooking>({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurant:{
        type:Schema.Types.ObjectId,
        ref:"Restaurant",
       required:true
    },

    date:{
        type:Date,
        required:true,
       
        
    },

    time:{
        type:String,
        required:true
     
     
    },

    guest:{
        type:Number,
        required:true,
        min:1

    },

    occasions:{
        type:String,
        trim:true
    },
    specialRequest:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:["confirmed","cancelled","completed"],
        default:"confirmed"
    },

    bookingId:{
        type:String,
        unique:true
    }


},

{timestamps:true}

)


// Auto generate reference code on save
bookingSchema.pre("save",function(){
    if(!this.bookingId){
        this.bookingId=`GR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
    }

})

export const Booking=model<IBooking>("Booking",bookingSchema)
