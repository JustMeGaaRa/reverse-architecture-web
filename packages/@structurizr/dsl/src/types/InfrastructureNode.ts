import { IInfrastructureNode, IElement, ISupportSnapshot } from "../interfaces";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type InfrastructureNodeValues =
    Required<Pick<IInfrastructureNode, "identifier" | "name">>
    & Partial<Omit<IInfrastructureNode, "type" | "identifier" | "name">>;

export class InfrastructureNode implements IElement, ISupportSnapshot<IInfrastructureNode> {
    constructor(params: InfrastructureNodeValues) {
        this.type = ElementType.InfrastructureNode;
        this.identifier = params.identifier;
        this.name = params.name;
        this.description = params.description;
        this.technology = params.technology;
        this.url = params.url;
        // this.properties = params.properties;
        // this.perspectives = params.perspectives;
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.tags = [
            Tag.Element,
            Tag.InfrastructureNode,
            ...(params.tags
                ?.filter(x => x.name !== Tag.Element.name)
                ?.filter(x => x.name !== Tag.InfrastructureNode.name) ?? []
            )
        ];
    }

    public readonly type: ElementType.InfrastructureNode;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly description?: string;
    public readonly technology?: Technology[];
    public readonly tags: Tag[];
    public readonly url?: Url;
    // public readonly properties?: Properties;
    // public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toSnapshot(): IInfrastructureNode {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            description: this.description,
            technology: this.technology,
            tags: this.tags,
            url: this.url,
            // properties: this.properties,
            // perspectives: this.perspectives,
            relationships: this.relationships.map(r => r.toSnapshot())
        }
    }
}