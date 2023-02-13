import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export class InfrastructureNode implements Element {
    constructor(name: string, description?: string, technology?: Technology[], tags?: Tag[]) {
        this.name = name;
        this.description = description;
        this.technology = technology;
        this.tags = [
            Tag.Element,
            Tag.DeploymentNode,
            ...(tags ?? [])
        ];
    }

    identifier: Identifier;
    name!: string;
    relationships: Relationship[];
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives: Perspectives;
}
