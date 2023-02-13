import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export class Relationship {
    constructor(
        sourceIdentifier: Identifier,
        targetIdentifier: Identifier,
        description?: string,
        technology?: Technology[],
        tags?: Tag[]
    ) {
        this.sourceIdentifier = sourceIdentifier;
        this.targetIdentifier = targetIdentifier;
        this.description = description;
        this.technology = technology;
        this.tags = [
            Tag.Relationship,
            ...(tags ?? [])
        ];
    }

    sourceIdentifier: Identifier;
    targetIdentifier: Identifier;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
}

export function relationship(
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier,
    description?: string,
    technology?: Technology[],
    tags?: Tag[]
) {
    return new Relationship(
        sourceIdentifier,
        targetIdentifier,
        description,
        technology,
        tags
    );
}