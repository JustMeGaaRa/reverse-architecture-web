import { IWorkspaceSnapshot, Workspace } from "@structurizr/dsl";
import { StructurizrLexer } from "./StructurizrLexer";
import { StructurizrParser } from "./StructurizrParser";
import { StructurizrVisitor } from "./StructurizrVisitor";

// TODO: return IWorkspaceSnapshot type iusntead of any after refactoring the code
export const parseStructurizr = (structurizr: string): IWorkspaceSnapshot => {
    const parseText = (structurizr: string) => {
        const structurizrParser = new StructurizrParser();
        const lexingResult = StructurizrLexer.tokenize(structurizr);
        structurizrParser.input = lexingResult.tokens;
        const workspaceCstNode = structurizrParser.workspace();
        return workspaceCstNode;
    }

    const parseCst = (workspaceCst: any): Workspace => {
        const structurizrVisitor = new StructurizrVisitor();
        const workspace = structurizrVisitor.visit(workspaceCst);
        return workspace;
    }

    return parseCst(parseText(structurizr));
};

export const isStructurizrValid = (structurizr: string): boolean => {
    try {
        parseStructurizr(structurizr);
        return true;
    }
    catch (error) {
        return false;
    }
}