import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'domain/shared/value-objects';
import { IAuthService } from 'domain/use-cases/auth';
import { User } from 'domain/user';
export declare class AuthService implements IAuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signInJWT(user: User): Promise<AccessToken>;
}
