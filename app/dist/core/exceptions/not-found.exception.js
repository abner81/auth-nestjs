"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const exception_1 = require("./exception");
class NotFoundException extends exception_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map