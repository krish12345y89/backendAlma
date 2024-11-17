import {model,Document,Schema} from "mongoose";
interface ItempUser extends Document{
    email:string;
    uuid:string;
    createdAt:Date;
    updatedAt:Date;
}
const tempUserSchema=new Schema<ItempUser>({
    email:{
        type:String,
        required:[true,"please provide the email id"]
    },
    uuid:{
        type:String,
        required:[true,"uuid is must to become temp user"]
    }
})
export const tempUser=model<ItempUser>("temUser",tempUserSchema);