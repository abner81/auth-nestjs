"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendWelcomeEmailHandler = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../constants");
const user_1 = require("../../domain/events/user");
const get_template_1 = require("../../core/util/email-template/get-template");
const path = require("path");
let SendWelcomeEmailHandler = class SendWelcomeEmailHandler {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async handle(event) {
        const user = event.payload;
        const templatePath = path.join(constants_1.EMAIL_TEMPLATES_FOLDER, 'welcome', 'welcome-user-template.html');
        const welcomeTemplate = (0, get_template_1.getTemplate)(templatePath);
        await this.emailService.send({
            tags: ['welcome-email'],
            subject: 'Seja Bem-vindo',
            to: [{ email: user.email, name: user.name }],
            html: welcomeTemplate,
            personalization: [
                { email: user.email.value, data: { userName: user.name.firstName } },
            ],
        });
    }
};
exports.SendWelcomeEmailHandler = SendWelcomeEmailHandler;
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(user_1.UserCreatedEvent.name),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [user_1.UserCreatedEvent]),
    tslib_1.__metadata("design:returntype", Promise)
], SendWelcomeEmailHandler.prototype, "handle", null);
exports.SendWelcomeEmailHandler = SendWelcomeEmailHandler = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.SEND_EMAIL_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], SendWelcomeEmailHandler);
//# sourceMappingURL=send-welcome-email-handler.js.map