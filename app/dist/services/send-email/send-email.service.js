"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
require("dotenv/config");
let SendEmailService = class SendEmailService {
    constructor(emailPort) {
        this.emailPort = emailPort;
    }
    async send(params) {
        const from = {
            email: process.env.EMAIL_FROM,
            name: 'Auth User Project',
        };
        return this.emailPort.send({ ...params, from });
    }
};
exports.SendEmailService = SendEmailService;
exports.SendEmailService = SendEmailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.EMAIL_PORT)),
    tslib_1.__metadata("design:paramtypes", [Object])
], SendEmailService);
//# sourceMappingURL=send-email.service.js.map