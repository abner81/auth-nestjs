"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedException = void 0;
const exception_1 = require("./exception");
class UnexpectedException extends exception_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.UnexpectedException = UnexpectedException;
//# sourceMappingURL=unexpected.exception.js.map