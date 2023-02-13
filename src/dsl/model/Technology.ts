export class Technology {
    constructor(name: string) {
        this.name = name;
    }

    name!: string;
}

export function technology(name: string) {
    return new Technology(name);
}

export function technologies(...names: string[]) {
    return names.map(name => new Technology(name));
}