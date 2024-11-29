"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
const exceptions_1 = require("../exceptions");
class DomainException extends exceptions_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=exceptions.js.map