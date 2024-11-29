"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = exports.params = exports.makeModule = void 0;
const testing_1 = require("@nestjs/testing");
const constants_1 = require("../../constants");
const value_objects_1 = require("../../domain/shared/value-objects");
const value_objects_2 = require("../../domain/user/value-objects");
const send_email_1 = require("../../services/send-email");
const makeModule = async () => {
    return await testing_1.Test.createTestingModule({
        providers: [
            send_email_1.SendEmailService,
            { provide: constants_1.EMAIL_PORT, useValue: { send: jest.fn() } },
        ],
    }).compile();
};
exports.makeModule = makeModule;
exports.params = {
    html: '<h1>Olá! Seja bem-vindo.</h1>',
    subject: 'subject',
    to: [
        {
            email: new value_objects_2.Email({ email: 'johndoe@gmail.com' }),
            name: new value_objects_1.Name({ name: 'john doe' }),
        },
    ],
};
exports.from = {
    email: process.env.EMAIL_FROM,
    name: 'Auth User Project',
};
//# sourceMappingURL=send-email-service.mock.js.map