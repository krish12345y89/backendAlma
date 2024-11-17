import { NextFunction } from "express";
import { ErrorSend } from "../../utils/errorHandling.js";
import { User } from "../models/user.js"
import { tempUser } from "../models/tempUser.js";

export class UserRepository {

    async tempUserSignup(uuid: string, email: string, next: NextFunction) {
        try {
            const user = {
                uuid: uuid,
                email: email
            };
            const result = new tempUser(user);
            await result.save();
        } catch (err: any) {
            next(new ErrorSend("failed to create user", 500))
        }
    }

    async userSignup(next: NextFunction, name: string, email: string, uuid: string, startYear: number, state: string, district: string, endYear: number, phoneNumber: number, trade: string, avatar: { url: string, publicId: string }, profession: string, linkdin?: string, facebook?: string, twitter?: string, rollNo?: string, status?: string, about?: string, proof?: string,) {
        try {
            const user = {
                uuid: uuid,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                trade: trade,
                startYear: startYear,
                endYear: endYear,
                profession: profession,
                rollNo: rollNo,
                state: state,
                district: district,
                avatar: avatar,
                linkdin: linkdin,
                facebook: facebook,
                twitter: twitter,
                about: about
            }
            const result = new User(user);
            await result.save();
        }
        catch (err) {
            next(new ErrorSend("failed to create user", 500))
        }
    }
}
