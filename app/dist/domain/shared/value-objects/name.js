"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = exports.InvalidNameException = void 0;
const exceptions_1 = require("../../../core/domain/exceptions");
const value_object_1 = require("../../../core/domain/value-object");
const guards_1 = require("../../../core/guards");
const string_1 = require("../../../core/util/string");
class InvalidNameException extends exceptions_1.DomainException {
    constructor() {
        super(`Invalid name. Enter your first and last name.`);
    }
}
exports.InvalidNameException = InvalidNameException;
class Name extends value_object_1.ValueObject {
    get value() {
        return this.state;
    }
    get firstName() {
        return this.value.split(' ')[0];
    }
    get lastName() {
        return this.value.split(' ')[1];
    }
    capitalizeName(name) {
        const remainLowercase = ['de', 'da', 'do', 'dos', 'das'];
        return name
            .trim()
            .split(/\s+/)
            .map((word, index) => {
            const notApplyInWord = remainLowercase.includes(word.toLowerCase()) && index > 0;
            if (notApplyInWord)
                return word.toLowerCase();
            return (0, string_1.capitalize)(word);
        })
            .join(' ');
    }
    parse(props) {
        const { name } = props;
        guards_1.Guards.againstNullOrUndefined(name, 'Name');
        try {
            guards_1.Guards.ensureMinWords(Name.minWords, name, 'Name');
        }
        catch (error) {
            throw new InvalidNameException();
        }
        return this.capitalizeName(name.trim());
    }
    export() {
        return { name: this.state };
    }
}
exports.Name = Name;
Name.minWords = 2;
//# sourceMappingURL=name.js.map