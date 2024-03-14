import { ISoftwareSystem, IElement, ISupportSnapshot } from "../interfaces";
import { Container } from "./Container";
import { ElementType } from "./ElementType";
import { Group } from "./Group";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export type SoftwareSystemParams =
    Required<Pick<ISoftwareSystem, "name" | "identifier">>
    & Partial<Omit<ISoftwareSystem, "type" | "name"| "identifier">>

export class SoftwareSystem implements IElement, ISupportSnapshot<ISoftwareSystem> {
    constructor(params: SoftwareSystemParams) {
        this.type = ElementType.SoftwareSystem;
        this.identifier = params.identifier;
        this.name = params.name;
        this.groups = params.groups ? params.groups.map(g => new Group(g)) : [];
        this.containers = params.containers ? params.containers.map(c => new Container(c)) : [];
        this.technology = params.technology ?? [];
        this.description = params.description;
        this.url = params.url;
        // this.properties = params.properties;
        // this.perspectives = params.perspectives;
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.tags = [
            Tag.Element,
            Tag.SoftwareSystem,
            ...(params.tags
                ?.filter(x => x.name !== Tag.Element.name)
                ?.filter(x => x.name !== Tag.SoftwareSystem.name) ?? []
            )
        ]
    }

    public readonly type: ElementType.SoftwareSystem;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly groups: Group[];
    public readonly containers: Container[];
    public readonly technology: Technology[];
    public readonly description?: string;
    public readonly tags: Tag[];
    public readonly url?: Url;
    // public readonly properties?: Properties;
    // public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toSnapshot(): ISoftwareSystem {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            groups: this.groups.map(g => g.toSnapshot()),
            containers: this.containers.map(c => c.toSnapshot()),
            technology: this.technology,
            description: this.description,
            tags: this.tags,
            url: this.url,
            // properties: this.properties,
            // perspectives: this.perspectives,
            relationships: this.relationships.map(r => r.toSnapshot())
        }
    }

    public addGroup(group: Group) {
        this.groups.push(group);
    }

    public addContainer(container: Container, groupId?: Identifier) {
        if (groupId) {
            this.groups.find(g => g.identifier === groupId)?.addContainer(container);
        }
        else {
            this.containers.push(container);
        }
    }

    public addRelationship(relationship: Relationship) {
        this.relationships.push(relationship);
    }
}