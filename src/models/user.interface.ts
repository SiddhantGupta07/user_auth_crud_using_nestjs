import {Document} from 'mongoose';

export interface User extends Document{
    email : string;
    password : string;
    first_name : string;
    last_name : string;
    status : string;
    user_type : string;
}