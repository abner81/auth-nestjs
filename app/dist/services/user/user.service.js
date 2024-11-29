"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const exceptions_1 = require("../../core/exceptions");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_1 = require("../../domain/events/user");
let UserService = class UserService {
    constructor(userRepository, eventEmitter) {
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
    }
    async create(user) {
        const alreadyExists = await this.userRepository.exists(user.email);
        if (alreadyExists)
            throw new exceptions_1.OperationConflictException('E-mail já cadastrado.');
        await user.hashPassword();
        this.userRepository.create(user);
        this.eventEmitter.emit(user_1.UserCreatedEvent.name, new user_1.UserCreatedEvent(user));
        return;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], UserService);
//# sourceMappingURL=user.service.js.map