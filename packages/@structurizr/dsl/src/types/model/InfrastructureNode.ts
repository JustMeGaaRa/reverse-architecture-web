import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type InfrastructureNodeParams = 
    Required<Pick<InfrastructureNode, "identifier" | "name">>
    & Partial<Omit<InfrastructureNode, "identifier" | "name">>;

export class InfrastructureNode implements Element {
    constructor(
        params: InfrastructureNodeParams
    ) {
        this.identifier = params.identifier;
        this.name = params.name;
        this.description = params.description;
        this.technology = params.technology ?? [];
        this.tags = [
            Tag.Element,
            Tag.InfrastructureNode,
            ...(params.tags ?? [])
        ];
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships ?? [];
    }

    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly description?: string;
    public readonly technology?: Technology[];
    public readonly tags: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];
}