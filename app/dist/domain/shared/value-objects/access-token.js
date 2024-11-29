"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = exports.JWTSecretNotExistsException = void 0;
const value_object_1 = require("../../../core/domain/value-object");
const exceptions_1 = require("../../../core/exceptions");
const guards_1 = require("../../../core/guards");
require("dotenv/config");
class JWTSecretNotExistsException extends exceptions_1.ImplementationException {
    constructor() {
        super('The environment variable: "JWT_SECRET" is empty');
    }
}
exports.JWTSecretNotExistsException = JWTSecretNotExistsException;
class AccessToken extends value_object_1.ValueObject {
    get value() {
        return this.state;
    }
    parse(props) {
        const { accessToken } = props;
        guards_1.Guards.againstNullOrUndefined(accessToken, 'AccessToken');
        guards_1.Guards.ensureIsJwt(accessToken, 'AccessToken');
        if (!process.env.JWT_SECRET)
            throw new JWTSecretNotExistsException();
        return accessToken;
    }
    export() {
        return { accessToken: this.state };
    }
}
exports.AccessToken = AccessToken;
//# sourceMappingURL=access-token.js.map