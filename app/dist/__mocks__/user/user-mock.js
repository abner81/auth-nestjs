"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMock = void 0;
const user_1 = require("../../domain/user");
exports.userMock = user_1.User.create({
    email: 'johndoe@gmail.com',
    name: 'john doe',
    password: 'my_password',
});
//# sourceMappingURL=user-mock.js.map