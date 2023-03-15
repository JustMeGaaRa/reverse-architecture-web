import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export interface InfrastructureNode extends Element {
    identifier: Identifier;
    name: string;
    relationships?: Relationship[];
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
}

export function InfrastructureNode(
    identifier: Identifier,
    name: string,
    description?: string,
    technology?: Technology[],
    tags?: Tag[]
): InfrastructureNode {
    return {
        identifier,
        name,
        description,
        technology,
        tags: [
            Tag.Element,
            Tag.DeploymentNode,
            ...(tags ?? [])
        ]
    }
}
