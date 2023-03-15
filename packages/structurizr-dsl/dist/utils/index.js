"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indent = exports.line = void 0;
function line(line) {
    return line ? `${line}\n` : "";
}
exports.line = line;
function indent(text) {
    return text
        .split('\n')
        .map(line => `\t${line}`)
        .join('\n');
}
exports.indent = indent;
//# sourceMappingURL=index.js.map