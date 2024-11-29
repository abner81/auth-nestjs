"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const value_objects_1 = require("../../domain/user/value-objects");
const parse_controller_error_1 = require("../../core/util/controller/parse-controller-error");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async create(dto, res) {
        try {
            console.log(dto);
            const email = new value_objects_1.Email({ email: dto.email });
            const password = new value_objects_1.Password({ password: dto.password });
            const { accessToken } = await this.loginService.execute({
                email,
                password,
            });
            return res.status(common_1.HttpStatus.OK).json(accessToken.export());
        }
        catch (error) {
            console.log(error);
            return (0, parse_controller_error_1.ParseControllerError)(error, res);
        }
    }
};
exports.LoginController = LoginController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "create", null);
exports.LoginController = LoginController = tslib_1.__decorate([
    (0, common_1.Controller)('/login'),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.LOGIN_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], LoginController);
//# sourceMappingURL=login.controller.js.map