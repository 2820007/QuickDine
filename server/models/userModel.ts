
import {model, Schema,Document} from "mongoose"


export interface IUser extends Document{
    name:string
    email:string
    password?:string
    phone?:string
    role:"user" | "admin" |"owner"
    createdAT:Date
    updatedAt:Date
}

const userSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
        
    },
    phone:{
        type:String,
        minlength:6,
        trim:true
    },

    role:{
        type:String,
        enum:["user","admin","owner"],
        default:"user"

    },


},
{timestamps:true}

)


//Remove password when converting to json
userSchema.set("toJSON",{
    transform:(doc,ret)=>{
        delete ret.password
        return ret
    }
})
export const User=model<IUser>("User",userSchema)
