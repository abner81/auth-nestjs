"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_TEMPLATES_FOLDER = exports.SEND_EMAIL_SERVICE = exports.EMAIL_PORT = exports.EMAIL_SENDER_IMP = exports.LOGIN_REPOSITORY = exports.LOGIN_SERVICE = exports.AUTH_SERVICE = exports.USER_REPOSITORY = exports.USER_SERVICE = void 0;
const path = require("path");
exports.USER_SERVICE = 'IUserService';
exports.USER_REPOSITORY = 'IUserRepository';
exports.AUTH_SERVICE = 'IAuthService';
exports.LOGIN_SERVICE = 'ILoginService';
exports.LOGIN_REPOSITORY = 'ILoginRepository';
exports.EMAIL_SENDER_IMP = 'MailerSend';
exports.EMAIL_PORT = 'IEmailPort';
exports.SEND_EMAIL_SERVICE = 'ISendEmailService';
exports.EMAIL_TEMPLATES_FOLDER = path.join(process.cwd(), 'src', 'core', 'util', 'email-template');
//# sourceMappingURL=constants.js.map