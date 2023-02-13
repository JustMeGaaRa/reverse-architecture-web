export class Tag {
    constructor(name: string) {
        this.name = name;
    }

    name!: string;

    static Element = new Tag("Element");
    static Person = new Tag("Person");
    static SoftwareSystem = new Tag("Software System");
    static Container = new Tag("Container");
    static Component = new Tag("Component");
    static DeploymentNode = new Tag("Deployment Node");
    static InfrastructureNode = new Tag("Infrastructure Node");
    static SoftwareSystemInstance = new Tag("Software System Instance");
    static ContainerInstance = new Tag("Container Instance");
    static Relationship = new Tag("Relationship");
}

export function tags(...names: string[]) {
    return names.map(name => new Tag(name));
}