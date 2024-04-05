import { Router, Request, Response } from "express";
import { UserRepository } from "../../framework/repository/user.repo";
import { UserController } from "../controllers/user.controller";
import { UserUsecase } from "../../usecases/user.usecase";
import { UserModel } from "../../framework/model/user.model";

export class UserRouter{
    router = Router()

    userRepository = new UserRepository(UserModel)
    userUseCase = new UserUsecase(this.userRepository)
    userController = new UserController(this.userUseCase)

    constructor(){
        this.router.get('/getAllContacts', (req: Request, res: Response) => {
            this.userController.getAllContacts(req, res)
        })
        this.router.post('/addContacts', (req: Request, res: Response) => {
            this.userController.addNewContacts(req, res)
        })
        this.router.put('/updateContact/:contactId', (req: Request, res: Response) => {
            this.userController.updateContact(req, res)
        })
        this.router.delete('/deleteContact/:contactId', (req: Request, res: Response)=>{
            this.userController.deleteContact(req, res)
        })
    }
}

export const userRouter = new UserRouter().router;