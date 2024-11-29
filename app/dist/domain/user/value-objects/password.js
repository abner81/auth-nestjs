"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = exports.IncorrectPasswordException = void 0;
const exceptions_1 = require("../../../core/domain/exceptions");
const value_object_1 = require("../../../core/domain/value-object");
const exceptions_2 = require("../../../core/exceptions");
const guards_1 = require("../../../core/guards");
class IncorrectPasswordException extends exceptions_2.UnauthorizedException {
    constructor() {
        super('Senha inválida.');
    }
}
exports.IncorrectPasswordException = IncorrectPasswordException;
class Password extends value_object_1.ValueObject {
    get value() {
        return this.state;
    }
    get isHashed() {
        return this.isHash(this.value);
    }
    isHash(password) {
        const bcryptHashRegex = /^\$2[aby]\$\d{2}\$.{53}$/;
        return bcryptHashRegex.test(password);
    }
    againstAppropriateLength(password) {
        if (!(password.length >= Password.minLength))
            throw new exceptions_1.DomainException('Password isnt contains a min length [8 chars min].');
    }
    parse(props) {
        const { password } = props;
        guards_1.Guards.againstNullOrUndefined(password, 'password');
        if (!this.isHash(password))
            this.againstAppropriateLength(password);
        return password;
    }
    export() {
        return { password: this.state };
    }
}
exports.Password = Password;
Password.minLength = 8;
//# sourceMappingURL=password.js.map