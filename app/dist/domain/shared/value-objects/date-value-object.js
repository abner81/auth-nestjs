"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValueObject = void 0;
const exceptions_1 = require("../../../core/domain/exceptions");
const value_object_1 = require("../../../core/domain/value-object");
const guards_1 = require("../../../core/guards");
const types_1 = require("util/types");
class DateValueObject extends value_object_1.ValueObject {
    get value() {
        return this.state;
    }
    static create() {
        return new DateValueObject({ date: new Date() });
    }
    parse(props) {
        const { date } = props;
        guards_1.Guards.againstNullOrUndefined(date, 'Date');
        if (!(0, types_1.isDate)(date))
            throw new exceptions_1.DomainException('Date is not in a valid format.');
        return date;
    }
    export() {
        return { date: this.state };
    }
}
exports.DateValueObject = DateValueObject;
//# sourceMappingURL=date-value-object.js.map