import { IUser } from "../adapters/interfaces/IUser.interfaces";
import { IUserUsecase } from "../adapters/interfaces/IUserUsecase.interface";
import { UserRepository } from "../framework/repository/user.repo";
export class UserUsecase implements IUserUsecase{
    constructor(private userRepository: UserRepository) {}
    async getAllContacts(): Promise<any> {
        return this.userRepository.getAllContacts()
    }
    async addNewContacts(user: IUser): Promise<IUser> {
        return this.userRepository.addNewContacts(user)
    }
    async updateContact(id: string, data: IUser): Promise<any> {
        return this.userRepository.updateContact(id, data)
    }
    async deleteContact(id: string): Promise<void> {
        return this.userRepository.deleteContact(id)
    }
}