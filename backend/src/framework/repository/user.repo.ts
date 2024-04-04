import { Model } from "mongoose";
import { IUser } from "../../adapters/interfaces/IUser.interfaces";
import { IUserUsecase } from "../../adapters/interfaces/IUserUsecase.interface";




export class UserRepository implements IUserUsecase{
    private readonly UserModel: Model<IUser>;

    constructor(UserModel: Model<IUser>) {
      this.UserModel = UserModel;
    }
    getAllContacts(): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async addNewContacts(user: IUser): Promise<void> {
        try {
            
        } catch (error) {
            console.log("Error:",error);
        }
    }
    updateContact(): Promise<void> {
        try {
            
        } catch (error) {
            console.log("Error:",error);
        }
    }
    deleteContact(): Promise<void> {
        try {
            
        } catch (error) {
            console.log("Error:",error);
        }
    }
}