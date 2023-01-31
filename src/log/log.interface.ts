import { Document } from "mongoose";

export class Log extends Document{
    activity_type : string;
    activity_data : string;
    activity_date : Date;
}