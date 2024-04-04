import mongoose,{ Schema } from "mongoose";
import { AddressModel } from "./address.model";
import { IUser } from "../../adapters/interfaces/IUser.interfaces";


const userSchema = new Schema<IUser>({
    _id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String, required: true, minlength: 3 },
    gender: { type: String, required: true, enum: ['MALE', 'FEMALE', 'OTHERS'] },
    address: { type: AddressModel, required: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { type: String, required: true, match: /^\d{10}$/ },
    other: { type: Schema.Types.Mixed } // For other properties (optional)
  });

  export const UserModel = mongoose.model<IUser>('User', userSchema);