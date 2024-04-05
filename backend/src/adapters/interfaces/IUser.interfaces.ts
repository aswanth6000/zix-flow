import { Document } from "mongoose";
import { IAddress } from "./IAddress.interface";

export interface IUser extends Document{
    _id: string;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE' | 'OTHERS';
    address: IAddress[];
    email: string;
    phone: string;
    other?: Record<string, any>;
}