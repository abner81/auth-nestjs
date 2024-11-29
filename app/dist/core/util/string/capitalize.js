"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
function capitalize(text) {
    if (!text)
        return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
//# sourceMappingURL=capitalize.js.map