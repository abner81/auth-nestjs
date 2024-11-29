"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_1 = require("./user");
const email_module_1 = require("../email.module");
let EventHandlerModule = class EventHandlerModule {
};
exports.EventHandlerModule = EventHandlerModule;
exports.EventHandlerModule = EventHandlerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule],
        providers: [user_1.SendWelcomeEmailHandler],
    })
], EventHandlerModule);
//# sourceMappingURL=event-handler.module.js.map