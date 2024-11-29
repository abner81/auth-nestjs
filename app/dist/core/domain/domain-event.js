"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
class DomainEvent {
    get payload() {
        return this._payload;
    }
    constructor(payload) {
        this._payload = payload;
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=domain-event.js.map