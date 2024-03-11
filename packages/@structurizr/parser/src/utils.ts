import { IWorkspaceSnapshot, Workspace } from "@structurizr/dsl";
import { StructurizrLexer } from "./StructurizrLexer";
import { StructurizrParser } from "./StructurizrParser";
import { StructurizrVisitor } from "./StructurizrVisitor";

// TODO: return IWorkspaceSnapshot type iusntead of any after refactoring the code
export const parseStructurizr = (structurizr: string): IWorkspaceSnapshot => {
    const parseText = (structurizr: string) => {
        try {
            const parser = new StructurizrParser();
            const result = StructurizrLexer.tokenize(structurizr);
            parser.input = result.tokens;
            const cstNode = parser.workspace();
            return cstNode;
        }
        catch (error) {
            throw error;
        }
    }

    const parseCst = (workspaceCst: any): Workspace => {
        try {
            const visitor = new StructurizrVisitor();
            const workspace = visitor.visit(workspaceCst);
            return workspace;
        }
        catch (error) {
            throw error;
        }
    }

    return parseCst(parseText(structurizr));
};

export const validateStructurizr = (structurizr: string): boolean => {
    try {
        parseStructurizr(structurizr);
        return true;
    }
    catch (error) {
        return false;
    }
}

export const emptyWorkspace = (): IWorkspaceSnapshot => {
    return {
        version: 1,
        name: "Empty Workspace",
        description: "An empty workspace.",
        model: {
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: [],
            groups: []
        },
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
            configuration: {
                styles: {
                    elements: [],
                    relationships: []
                },
                themes: []
            },
        }
    }
}