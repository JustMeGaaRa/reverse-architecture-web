import { Identifier } from "../types/model/Identifier";
import { Workspace } from "../types/Workspace";

export function line(line: string) {
    return  line ? `${line}\n` : ""; 
}

export function indent(text: string) {
    return text
        .split('\n')
        .map(line => `\t${line}`)
        .join('\n');
}

export const relationshipExists = (
    workspace: Workspace,
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier
) => {
    return workspace?.model.relationships.some(x => 
        x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
        || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier
    )
}