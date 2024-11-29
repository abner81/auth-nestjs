"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const exception_1 = require("./exception");
class UnauthorizedException extends exception_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map