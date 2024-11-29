"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const user_1 = require("../../domain/user");
const value_objects_1 = require("../../domain/user/value-objects");
let LoginService = class LoginService {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async execute(params) {
        const user = await this.userRepo.findByEmail(params.email);
        if (!user)
            throw new user_1.UserNotFoundException();
        const isValidPassword = await user.comparePassword(params.password);
        if (!isValidPassword)
            throw new value_objects_1.IncorrectPasswordException();
        const accessToken = await this.authService.signInJWT(user);
        return { accessToken };
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    tslib_1.__param(1, (0, common_1.Inject)(constants_1.AUTH_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], LoginService);
//# sourceMappingURL=login.service.js.map