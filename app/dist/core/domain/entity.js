"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const domain_object_1 = require("./domain-object");
class Entity extends domain_object_1.DomainObject {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get domainEvents() {
        return [...this._domainEvents];
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
    clone() {
        const constructor = this.constructor;
        return new constructor(this.export());
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map