"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipientToIndex = exports.mailerSendParams = exports.props = exports.buildModule = void 0;
const testing_1 = require("@nestjs/testing");
const constants_1 = require("../../constants");
const email_1 = require("../../infra/email");
const value_objects_1 = require("../../domain/user/value-objects");
const value_objects_2 = require("../../domain/shared/value-objects");
const mailersend_1 = require("mailersend");
const buildModule = async () => await testing_1.Test.createTestingModule({
    providers: [
        email_1.MailerSendAdapter,
        {
            provide: constants_1.EMAIL_SENDER_IMP,
            useValue: { email: { send: jest.fn() } },
        },
    ],
}).compile();
exports.buildModule = buildModule;
exports.props = {
    from: {
        email: process.env.EMAIL_FROM,
        name: 'Auth Project',
    },
    html: '<h1>Ola, meu conteudo aqui.</h1>',
    subject: 'Seja bem-vindo',
    tags: ['welcome-email'],
    to: [
        {
            email: new value_objects_1.Email({ email: 'abner81@live.com' }),
            name: new value_objects_2.Name({ name: 'Abner Machado' }),
        },
        {
            email: new value_objects_1.Email({ email: 'abnermachado1@gmail.com' }),
            name: new value_objects_2.Name({ name: 'Abner Machado' }),
        },
    ],
    personalization: [{ email: 'abner81@live.com', data: { name: 'john doe' } }],
};
exports.mailerSendParams = new mailersend_1.EmailParams()
    .setFrom(new mailersend_1.Sender(exports.props.from.email, exports.props.from.name))
    .setSubject(exports.props.subject)
    .setHtml(exports.props.html)
    .setTags(exports.props.tags)
    .setPersonalization(exports.props.personalization);
const getRecipientToIndex = (index) => {
    return [
        {
            email: exports.props.to[index].email.value,
            name: exports.props.to[index].name.value,
        },
    ];
};
exports.getRecipientToIndex = getRecipientToIndex;
//# sourceMappingURL=mailer-send-adapter.mock.js.map