import { IUser } from "../adapters/interfaces/IUser.interfaces";
import { IUserUsecase } from "../adapters/interfaces/IUserUsecase.interface";
import { UserRepository } from "../framework/repository/user.repo";
export class UserUsecase implements IUserUsecase{
    constructor(private userRepository: UserRepository) {}
    async getAllContacts(): Promise<void> {
        return this.userRepository.getAllContacts()
    }
    async addNewContacts(user: IUser): Promise<void> {
        return this.userRepository.addNewContacts(user)
    }
    async updateContact(): Promise<void> {
        
    }
    async deleteContact(): Promise<void> {
        
    }
}