"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.technologies = exports.technology = exports.Technology = void 0;
class Technology {
    constructor(name) {
        this.name = name;
    }
    name;
}
exports.Technology = Technology;
function technology(name) {
    return new Technology(name);
}
exports.technology = technology;
function technologies(...names) {
    return names.map(name => new Technology(name));
}
exports.technologies = technologies;
//# sourceMappingURL=Technology.js.map