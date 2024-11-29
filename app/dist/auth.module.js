"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const auth_service_1 = require("./services/auth/auth.service");
require("dotenv/config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '7d' },
            }),
        ],
        providers: [{ provide: constants_1.AUTH_SERVICE, useClass: auth_service_1.AuthService }],
        exports: [constants_1.AUTH_SERVICE],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map