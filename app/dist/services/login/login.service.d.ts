import { ILoginService, IParams, IResponse } from 'domain/use-cases/login';
import { IUserRepository } from 'domain/use-cases/user';
import { IAuthService } from 'domain/use-cases/auth';
export declare class LoginService implements ILoginService {
    private readonly userRepo;
    private readonly authService;
    constructor(userRepo: IUserRepository, authService: IAuthService);
    execute(params: IParams): Promise<IResponse>;
}
