"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guards = void 0;
const exceptions_1 = require("../domain/exceptions");
const isEmail_1 = require("validator/lib/isEmail");
const validator_1 = require("validator");
class Guards {
    static againstNullOrUndefined(argument, argumentName) {
        if (argument == null)
            throw new exceptions_1.DomainException(`${argumentName} é nulo ou indefinido.`);
    }
    static againstInvalidEmail(argument, argumentName = 'Email') {
        if (argument == null || !(0, isEmail_1.default)(argument))
            throw new exceptions_1.DomainException(`${argumentName} inválido.`);
    }
    static ensureMinWords(minWords, argument, argumentName) {
        if (typeof argument !== 'string' ||
            !(argument.split(/\s+/).length >= minWords))
            throw new exceptions_1.DomainException(`${argumentName} not satisfies a min words [${minWords} min words].`);
    }
    static ensureIsJwt(argument, argumentName) {
        if (typeof argument !== 'string' || !(0, validator_1.isJWT)(argument))
            throw new exceptions_1.DomainException(`${argumentName} not satisfies a valid JWT Token.`);
    }
}
exports.Guards = Guards;
//# sourceMappingURL=guards.js.map