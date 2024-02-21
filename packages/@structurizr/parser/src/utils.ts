import { Workspace } from "@structurizr/dsl";
import { StructurizrLexer } from "./StructurizrLexer";
import { StructurizrParser } from "./StructurizrParser";
import { StructurizrVisitor } from "./StructurizrVisitor";

export const parseStructurizr = (text: string) => {
    const parseText = (workspaceText: string) => {
        try {
            const parser = new StructurizrParser();
            const result = StructurizrLexer.tokenize(workspaceText);
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

    return parseCst(parseText(text));
};

export const validateStructurizr = (text: string) => {
    try {
        parseStructurizr(text);
        return true;
    }
    catch (error) {
        return false;
    }
}