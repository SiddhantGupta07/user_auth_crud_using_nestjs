import * as mongoose from 'mongoose';




export const LogSchema = new mongoose.Schema({
    activity_type : {type: String, unique: false, required: true},
    activity_data : {type: String, unique: false, required: true},
    activity_date : {type: Date, unique: false, required: true, default : Date.now}
})