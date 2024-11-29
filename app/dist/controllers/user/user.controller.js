"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_1 = require("../../domain/user");
const constants_1 = require("../../constants");
const parse_controller_error_1 = require("../../core/util/controller/parse-controller-error");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(dto, res) {
        try {
            const user = user_1.User.create(dto);
            await this.userService.create(user);
            return res.status(common_1.HttpStatus.CREATED).send();
        }
        catch (error) {
            return (0, parse_controller_error_1.ParseControllerError)(error, res);
        }
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.USER_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserController);
//# sourceMappingURL=user.controller.js.map