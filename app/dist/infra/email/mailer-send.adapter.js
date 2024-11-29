"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerSendAdapter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mailersend_1 = require("mailersend");
require("dotenv/config");
const constants_1 = require("../../constants");
let MailerSendAdapter = class MailerSendAdapter {
    constructor(mailerSend) {
        this.mailerSend = mailerSend;
    }
    async send(props) {
        const { from, html, subject, to, personalization, tags } = props;
        to.forEach(async (recipient) => {
            const emailParams = new mailersend_1.EmailParams()
                .setFrom(new mailersend_1.Sender(from.email, from.name))
                .setSubject(subject)
                .setHtml(html)
                .setTags(tags)
                .setTo([new mailersend_1.Recipient(recipient.email.value, recipient.name.value)]);
            if (personalization) {
                emailParams.setPersonalization(personalization);
            }
            await this.mailerSend.email.send(emailParams);
        });
    }
};
exports.MailerSendAdapter = MailerSendAdapter;
exports.MailerSendAdapter = MailerSendAdapter = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(constants_1.EMAIL_SENDER_IMP)),
    tslib_1.__metadata("design:paramtypes", [mailersend_1.MailerSend])
], MailerSendAdapter);
//# sourceMappingURL=mailer-send.adapter.js.map