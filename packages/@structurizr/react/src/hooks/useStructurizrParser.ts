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
            parser.reset();
            parser.input = StructurizrLexer.tokenize(workspaceText).tokens;
            const workspaceCst = parser.workspace();
            return workspaceCst;
        }

        const parseCst = (workspaceCst: any) => {
            const visitor = new StructurizrVisitor();
            const workspace = visitor.visit(workspaceCst);
            return workspace;
        }

        return parseCst(parseText(text));
    }, []);

    return parseStructurizr;
}