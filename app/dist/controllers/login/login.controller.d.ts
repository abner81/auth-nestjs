import { Response } from 'express';
import { LoginDTO } from './login.DTO';
import { ILoginService } from 'domain/use-cases/login';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: ILoginService);
    create(dto: LoginDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
