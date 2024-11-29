"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const send_email_1 = require("./services/send-email");
const email_1 = require("./infra/email");
const mailersend_1 = require("mailersend");
require("dotenv/config");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            { provide: constants_1.SEND_EMAIL_SERVICE, useClass: send_email_1.SendEmailService },
            { provide: constants_1.EMAIL_PORT, useClass: email_1.MailerSendAdapter },
            {
                provide: constants_1.EMAIL_SENDER_IMP,
                useFactory: () => new mailersend_1.MailerSend({ apiKey: process.env.EMAIL_API_TOKEN }),
            },
        ],
        exports: [constants_1.SEND_EMAIL_SERVICE, constants_1.EMAIL_PORT, constants_1.EMAIL_SENDER_IMP],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map