"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const user_1 = require("../../domain/user");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async exists(email) {
        const user = await this.userRepo.findOne({ where: { email: email.value } });
        return !!user;
    }
    async create(_user) {
        const newUser = this.userRepo.create(_user.export());
        await this.userRepo.save(newUser);
    }
    async findByEmail(email) {
        const rawUser = await this.userRepo.findOne({
            where: { email: email.value },
        });
        return rawUser ? new user_1.User({ id: rawUser.id, ...rawUser }) : null;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map