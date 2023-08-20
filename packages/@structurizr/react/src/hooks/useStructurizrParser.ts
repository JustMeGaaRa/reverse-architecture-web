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
            const parser = new StructurizrParser();
            parser.input = StructurizrLexer.tokenize(workspaceText).tokens;
            return parser.workspace();
        }

        const parseCst = (workspaceCst: any): Workspace => {
            const visitor = new StructurizrVisitor();
            return visitor.visit(workspaceCst);
        }

        return parseCst(parseText(text));
    }, []);

    return { parseStructurizr };
}