import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    uuid: string;
    name: string;
    email: string;
    phoneNumber: number;
    avatar: {
        url: string;
        publicId: string;
    };
    createdAt: Date;
    updatedAt: Date;
    rollNo: number;
    trade: string;
    startYear: number;
    endYear: number;
    profession: string;
    state: string;
    district: string;
    linkdin: string;
    facebook: string;
    twitter: string;
    about: string;
    status: string;
    proof: string;
}

const userSchema = new Schema<IUser>({
    uuid: {
        type: String,
        required: [true, "please provide uuid"]
    },
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: [true, "please enter your number"],
        unique: true
    },
    avatar: {
        required: [true, "please upload your avatar"],
        url: {
            type: String,
            required: [true, "please upload your avatar"]
        },
        publicId: {
            type: String,
            reuired: true
        }
    },
    rollNo: {
        type: Number
    },
    startYear: {
        type: Number
    },
    endYear: {
        type: Number
    },
    profession: {
        type: String,
        required: [true, "please enter your current profession"]
    },
    linkdin: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    about: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Accepted", "rejected"]
    },
    proof: {
        type: String
    },


}, {
    timestamps: true
});

export const User = model<IUser>("User", userSchema);
