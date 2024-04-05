import { Model } from "mongoose";
import { IUser } from "../../adapters/interfaces/IUser.interfaces";
import { IUserUsecase } from "../../adapters/interfaces/IUserUsecase.interface";




export class UserRepository implements IUserUsecase {
    private readonly UserModel: Model<IUser>;

    constructor(UserModel: Model<IUser>) {
        this.UserModel = UserModel;
    }
    async getAllContacts(): Promise<any> {
        try {
            const allContacts = await this.UserModel.find();
            console.log(allContacts);
            return allContacts;
        } catch (error) {
            console.error("Error: ", error);
        }
    }
    async addNewContacts(user: IUser): Promise<IUser> {
        try {
            const email = user.email;
            const phone = user.phone
            if (!this.UserModel) {
                throw new Error('UserModel not available');
            }
            const exestingUser = await this.UserModel.find({ $or: [{ email }, { phone }] })
            console.log('sssssss',exestingUser);
            
            if (exestingUser.length > 0) {
                console.error('User already exists with email and phone');
                throw new Error('User with the same email or phone number already exists');
            }
            // Insert the new contact if not already exists
            const newUser = new this.UserModel(user);
            await newUser.save();
            console.log('New user added:', newUser);
            return newUser

        } catch (error) {
            throw error;
        }
    }
    async updateContact(id: string, data: IUser): Promise<any> {
        try {
            // Validate input parameters
            if (!id || typeof id !== 'string') {
                throw new Error('Invalid ID parameter');
            }
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data parameter');
            }

            // Check if the document exists
            const existingContact = await this.UserModel.findById(id);
            if (!existingContact) {
                throw new Error('Contact not found');
            }

            // Update the contact
            const updateContact = await this.UserModel.findByIdAndUpdate(id, data);
                return updateContact

        } catch (error) {
            throw error;
        }
    }

    async deleteContact(id: string): Promise<void> {
        try {
            // Validate input parameter
            if (!id || typeof id !== 'string') {
                throw new Error('Invalid ID parameter');
            }

            // Check if the document exists
            const existingContact = await this.UserModel.findById(id);
            if (!existingContact) {
                throw new Error('Contact not found');
            }

            // Delete the contact
            await this.UserModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}