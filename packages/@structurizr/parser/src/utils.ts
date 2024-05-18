import { CstNode, IToken } from "@chevrotain/types";
import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { Either, left, right, chain, fold } from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { StructurizrLexer } from "./StructurizrLexer";
import { StructurizrParser } from "./StructurizrParser";
import { StructurizrVisitor } from "./StructurizrVisitor";

export const structurizrLexer = (structurizr: string): Either<Array<Error>, Array<IToken>> => {
    try {
        const lexingResult = StructurizrLexer.tokenize(structurizr);
        return lexingResult.errors.length === 0
            ? right(lexingResult.tokens)
            : left(lexingResult.errors.map(error => new Error(error.message)));
    }
    catch (error) {
        return left([new Error("Error while lexing structurizr")]);
    }
}

export const parseStructurizr = (tokens: Array<IToken>): Either<Array<Error>, CstNode> => {
    try {
        const structurizrParser = StructurizrParser.instance;
        structurizrParser.reset();
        structurizrParser.input = tokens;
        const workspaceCstNode = structurizrParser.workspace();
        return structurizrParser.errors.length === 0
            ? right(workspaceCstNode)
            : left(structurizrParser.errors.map(error => new Error(error.message)));
    }
    catch (error) {
        return left(StructurizrParser.instance.errors);
    }
};

export const visitWorkspace = (workspaceCst: CstNode): Either<Array<Error>, IWorkspaceSnapshot> => {
    const structurizrVisitor = new StructurizrVisitor();

    try {
        const workspace = structurizrVisitor.visit(workspaceCst);
        return right(workspace);
    }
    catch (error) {
        return left([new Error("Error while parsing workspace")]);
    }
}

export const parseWorkspace = (
    structurizr: string,
    onError: (errors: Array<Error>) => void,
    onResult: (workspace: IWorkspaceSnapshot) => void
) => {
    return pipe(
        structurizrLexer(structurizr),
        chain(parseStructurizr),
        chain(visitWorkspace),
        fold(onError, onResult)
    )
}