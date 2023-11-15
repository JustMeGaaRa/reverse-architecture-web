import { Workspace } from "@structurizr/dsl";
import {
    StructurizrLexer,
    StructurizrParser,
    StructurizrVisitor
} from "@structurizr/parser";
import { useCallback } from "react";

export const useStructurizrParser = () => {
    const parseStructurizr = useCallback((text: string) => {
        const parseText = (workspaceText: string) => {
            try {
                const parser = new StructurizrParser();
                const result = StructurizrLexer.tokenize(workspaceText);
                console.log("lexing", result);
                parser.input = result.tokens;
                const cstNode = parser.workspace();
                console.log("cstNode", cstNode)
                return cstNode;
            }
            catch (error) {
                console.log(error)
                throw error;
            }
        }

        const parseCst = (workspaceCst: any): Workspace => {
            try {
                const visitor = new StructurizrVisitor();
                const workspace = visitor.visit(workspaceCst);
                console.log("workspace", workspace)
                return workspace;
            }
            catch (error) {
                console.log(error)
                throw error;
            }
        }

        return parseCst(parseText(text));
    }, []);

    return { parseStructurizr };
}