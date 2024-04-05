import { IUser } from "./IUser.interfaces";

export interface IUserUsecase{
    getAllContacts(): Promise<any>;
    addNewContacts(user: IUser): Promise<void>;
    updateContact(id: string, data: IUser): Promise<void>;
    deleteContact(id: string): Promise<void>;
}