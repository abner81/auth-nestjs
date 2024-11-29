import { CreateUserDTO } from './user.DTO';
import { IUserService } from 'domain/use-cases/user';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: IUserService);
    create(dto: CreateUserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
