"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityId = void 0;
const exceptions_1 = require("../../../core/domain/exceptions");
const value_object_1 = require("../../../core/domain/value-object");
const guards_1 = require("../../../core/guards");
const validator_1 = require("validator");
const uuid_1 = require("uuid");
class EntityId extends value_object_1.ValueObject {
    get value() {
        return this.state;
    }
    parse(props) {
        const { id } = props;
        guards_1.Guards.againstNullOrUndefined(id, 'id');
        if (!(0, validator_1.isUUID)(id, 4))
            throw new exceptions_1.DomainException('O valor informado não é um ID válido.');
        return id;
    }
    static create() {
        return new EntityId({
            id: (0, uuid_1.v4)(),
        });
    }
    export() {
        return { id: this.state };
    }
}
exports.EntityId = EntityId;
//# sourceMappingURL=entity-id.js.map