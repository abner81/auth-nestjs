"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserNotFoundException = void 0;
const entity_1 = require("../../core/domain/entity");
const value_objects_1 = require("./value-objects");
const value_objects_2 = require("../shared/value-objects");
const bcrypt = require("bcrypt");
const exceptions_1 = require("../../core/exceptions");
class UserNotFoundException extends exceptions_1.NotFoundException {
    constructor() {
        super('Usuário não encontrado.');
    }
}
exports.UserNotFoundException = UserNotFoundException;
class User extends entity_1.Entity {
    get email() {
        return this.state.email;
    }
    get createdAt() {
        return this.state.createdAt;
    }
    get id() {
        return this.state.id;
    }
    get name() {
        return this.state.name;
    }
    get accessToken() {
        return this.state.accessToken;
    }
    set accessToken(value) {
        this.state.accessToken = value;
    }
    get password() {
        return this.state.password;
    }
    set password(value) {
        this.state.password = value;
    }
    async hashPassword() {
        const hash = await bcrypt.hash(this.password.value, 10);
        this.password = new value_objects_1.Password({ password: hash });
    }
    async comparePassword(toCompare) {
        if (this.password.isHashed)
            return await bcrypt.compare(toCompare.value, this.password.value);
        else
            return this.password.equals(toCompare);
    }
    hidePassword() {
        this.password = null;
    }
    static create(props) {
        const id = value_objects_2.EntityId.create();
        const createdAt = value_objects_2.DateValueObject.create();
        return new User({ ...props, id: id.value, createdAt: createdAt.value });
    }
    parse(props) {
        const email = new value_objects_1.Email(props);
        const id = new value_objects_2.EntityId(props);
        const createdAt = new value_objects_2.DateValueObject({ date: props.createdAt });
        const password = new value_objects_1.Password(props);
        const name = new value_objects_2.Name(props);
        const accessToken = props.accessToken
            ? new value_objects_2.AccessToken({ accessToken: props.accessToken })
            : null;
        return { email, id, createdAt, password, name, accessToken };
    }
    export() {
        return {
            ...this.state.email.export(),
            createdAt: this.state.createdAt.value,
            ...this.state.id.export(),
            ...this.state.password.export(),
            ...this.state.name.export(),
            accessToken: this.state.accessToken?.value ?? null,
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map