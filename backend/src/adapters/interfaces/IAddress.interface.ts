import {Document} from 'mongoose'

export interface IAddress extends Document{
    line1: string;
    line2?: string;
    city: string;
    country: string;
    zipCode: string;
}