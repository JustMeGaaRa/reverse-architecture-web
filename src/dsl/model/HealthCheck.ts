import { Url } from "./Url";


export class HealthCheck {
    constructor(name: string, url: string, interval?: number, timeout?: number) {
        this.name = name;
        this.url = url;
        this.interval = interval;
        this.timeout = timeout;
    }

    name!: string;
    url!: Url;
    interval?: number;
    timeout?: number;
}
