"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = void 0;
const fs = require("fs");
const getTemplate = (absolutPath) => {
    return fs.readFileSync(absolutPath, 'utf-8');
};
exports.getTemplate = getTemplate;
//# sourceMappingURL=get-template.js.map