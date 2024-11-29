"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseControllerError = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../domain/exceptions");
const exceptions_2 = require("../../exceptions");
const ParseControllerError = (error, response) => {
    const makeResponse = (status) => {
        return response.status(status).json({
            error: error.message,
            type: error.name,
        });
    };
    if (error instanceof exceptions_2.OperationConflictException)
        return makeResponse(common_1.HttpStatus.CONFLICT);
    if (error instanceof exceptions_2.NotFoundException)
        return makeResponse(common_1.HttpStatus.NOT_FOUND);
    if (error instanceof exceptions_1.DomainException)
        return makeResponse(common_1.HttpStatus.BAD_REQUEST);
    return makeResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.ParseControllerError = ParseControllerError;
//# sourceMappingURL=parse-controller-error.js.map