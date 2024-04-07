import { Request, Response } from "express";
import { UserUsecase } from "../../usecases/user.usecase";


export class UserController {
    private readonly userUsecase: UserUsecase;
    constructor(userUsecase: UserUsecase) {
        this.userUsecase = userUsecase;
    }
    async getAllContacts(req: Request, res: Response) {
        try {
            const page: number = parseInt(req.query.page as string || '0', 5);   
            const {allusers, PAGE_SIZE, total} = await this.userUsecase.getAllContacts(page)
            res.status(200).json({ message: 'user data fetched successfully', allusers, totalPages: Math.ceil(total / PAGE_SIZE) })
        } catch (error) {
            return res.status(204).json(error)
        }
    }
    async addNewContacts(req: Request, res: Response) {
        try {
            const data = req.body

            const users = await this.userUsecase.addNewContacts(data)

            if (users) {
                return res.status(200).json({ message: 'Contacts added successfully' })
            }
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
    async updateContact(req: Request, res: Response) {
        try {
            const id = req.params.userId
            const data = req.body
            const updateContact = await this.userUsecase.updateContact(id, data)
            return res.status(200).json({ message: 'Contact updated successfully', data: updateContact })
        } catch (error) {
            return res.status(409).json(error)
        }
    }
    async deleteContact(req: Request, res: Response) {
        try {
            const id = req.params.userId

            const deleteContact = await this.userUsecase.deleteContact(id)
            return res.status(200).json({ message: 'Contact deleted successfully', deleteContact })
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}