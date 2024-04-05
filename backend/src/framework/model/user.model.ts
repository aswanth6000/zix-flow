import mongoose,{ Schema } from "mongoose";
import { IUser } from "../../adapters/interfaces/IUser.interfaces";
import { IAddress } from "../../adapters/interfaces/IAddress.interface";


const addressSchema = new Schema<IAddress>({
  line1: { type: String, required: true, minlength: 8 },
  line2: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true, uppercase: true },
  zipCode: { type: String, required: true, maxlength: 10 }
});


const userSchema = new Schema<IUser>({
    _id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String, required: true, minlength: 3 },
    gender: { type: String, required: true, enum: ['MALE', 'FEMALE', 'OTHERS'] },
    address: { type:[ addressSchema], required: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { type: String, required: true, match: /^\d{10}$/ },
    other: { type: Schema.Types.Mixed } // For other properties (optional)
  });

  export const UserModel = mongoose.model<IUser>('User', userSchema);