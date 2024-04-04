import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from '../../adapters/interfaces/IAddress.interface';

// Define the address schema
const addressSchema = new Schema<IAddress>({
  line1: { type: String, required: true, minlength: 8 },
  line2: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true, uppercase: true },
  zipCode: { type: String, required: true, maxlength: 10 }
});

export const AddressModel = mongoose.model<IAddress>('Address', addressSchema);