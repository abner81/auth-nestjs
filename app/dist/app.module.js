"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const user_controller_1 = require("./controllers/user/user.controller");
const user_repository_1 = require("./infra/user/user.repository");
const user_service_1 = require("./services/user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./infra/user/user.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_handler_module_1 = require("./event-handler/event-handler.module");
const dotenv = require("dotenv");
const email_module_1 = require("./email.module");
const login_service_1 = require("./services/login/login.service");
const auth_module_1 = require("./auth.module");
const login_controller_1 = require("./controllers/login/login.controller");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: process.env.DB_URL,
                database: process.env.DB_DATABASE,
                ssl: true,
                autoLoadEntities: true,
                synchronize: true,
                entities: [user_entity_1.UserEntity],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            event_emitter_1.EventEmitterModule.forRoot(),
            event_handler_module_1.EventHandlerModule,
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
        ],
        controllers: [user_controller_1.UserController, login_controller_1.LoginController],
        providers: [
            { provide: constants_1.USER_SERVICE, useClass: user_service_1.UserService },
            { provide: constants_1.USER_REPOSITORY, useClass: user_repository_1.UserRepository },
            { provide: constants_1.LOGIN_SERVICE, useClass: login_service_1.LoginService },
        ],
        exports: [constants_1.USER_SERVICE, constants_1.USER_REPOSITORY, constants_1.LOGIN_SERVICE],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map