import mongoose, { AnyKeys } from "mongoose";
const URI=process.env.URI ;
export const mongoConnect=async()=>{
    await mongoose.connect(URI as string).then(()=>{
        console.log("database connected to the application");
    }).catch((error:any)=>{
        console.log(error)
    })
}