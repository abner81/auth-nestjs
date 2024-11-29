"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const domain_object_1 = require("./domain-object");
class ValueObject extends domain_object_1.DomainObject {
    get state() {
        return super.state;
    }
    equals(other) {
        if (typeof other !== typeof this)
            return false;
        return JSON.stringify(this) === JSON.stringify(other);
    }
    parseAndStore(props) {
        super.parseAndStore(props);
        Object.freeze(this);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=value-object.js.map