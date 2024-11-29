"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationConflictException = void 0;
const exception_1 = require("./exception");
class OperationConflictException extends exception_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.OperationConflictException = OperationConflictException;
//# sourceMappingURL=operation-conflict.exception.js.map