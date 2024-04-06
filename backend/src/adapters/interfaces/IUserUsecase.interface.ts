import { IUser } from "./IUser.interfaces";

export interface IUserUsecase{
    getAllContacts(page: number): Promise<any>;
    addNewContacts(user: IUser): Promise<IUser>;
    updateContact(id: string, data: IUser): Promise<any>;
    deleteContact(id: string): Promise<void>;
}