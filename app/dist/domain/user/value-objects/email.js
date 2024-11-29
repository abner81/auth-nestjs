"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const value_object_1 = require("../../../core/domain/value-object");
const guards_1 = require("../../../core/guards");
class Email extends value_object_1.ValueObject {
    get value() {
        return this.state;
    }
    parse(props) {
        const { email } = props;
        guards_1.Guards.againstNullOrUndefined(email, 'email');
        guards_1.Guards.againstInvalidEmail(email, 'email');
        return email.toLowerCase();
    }
    export() {
        return { email: this.state };
    }
}
exports.Email = Email;
//# sourceMappingURL=email.js.map