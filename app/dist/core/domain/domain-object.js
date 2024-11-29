"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainObject = void 0;
const object_1 = require("../util/object");
const exceptions_1 = require("./exceptions");
const exceptions_2 = require("../exceptions");
class DomainObject {
    get state() {
        return this._state;
    }
    constructor(props) {
        this.parseAndStore(props);
    }
    toString() {
        const state = this._state;
        return String(state);
    }
    toJSON() {
        return this.export();
    }
    parseAndStore(props) {
        if (!(0, object_1.isObject)(props)) {
            const message = 'Construtor expects an object, but received: ' + typeof props;
            throw new exceptions_1.DomainException(message);
        }
        let state;
        try {
            state = this._state = this.parse(props);
        }
        catch (error) {
            if (error instanceof exceptions_1.DomainException)
                throw error;
            else if (error instanceof exceptions_2.InternalException)
                throw error;
            else
                throw new exceptions_1.DomainException(error?.message);
        }
        if ((0, object_1.isObject)(state) && state === props)
            throw new exceptions_2.ImplementationException('Return props object is not allowed.');
    }
}
exports.DomainObject = DomainObject;
//# sourceMappingURL=domain-object.js.map