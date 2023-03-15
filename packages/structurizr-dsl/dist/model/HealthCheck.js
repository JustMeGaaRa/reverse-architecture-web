"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheck = void 0;
class HealthCheck {
    constructor(name, url, interval, timeout) {
        this.name = name;
        this.url = url;
        this.interval = interval;
        this.timeout = timeout;
    }
    name;
    url;
    interval;
    timeout;
}
exports.HealthCheck = HealthCheck;
//# sourceMappingURL=HealthCheck.js.map