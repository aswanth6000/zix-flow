export interface IUserUsecase{
    getAllContacts(): Promise<void>;
    addNewContacts(): Promise<void>;
    updateContact(): Promise<void>;
    deleteContact(): Promise<void>;
}