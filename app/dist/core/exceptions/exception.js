"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.Exception = Exception;
//# sourceMappingURL=exception.js.map