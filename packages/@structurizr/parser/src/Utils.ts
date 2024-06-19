import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { ILexingError, IToken } from "chevrotain";
import { Either, left, right, chain, fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { StructurizrLexer } from "./StructurizrLexer";
import { StructurizrParser } from "./StructurizrParser";
import { StructurizrVisitor } from "./StructurizrVisitor";
import { WorkspaceCstNode } from "./WorkspaceCstNode";

export interface ILexingErrorExt extends Error, ILexingError {
    offset: number;
    line: number | undefined;
    column: number | undefined;
    length: number;
    message: string;
    name: string;
}

export class LexingError extends Error implements ILexingErrorExt {
    constructor(error: ILexingError) {
        super(error.message);
        this.offset = error.offset;
        this.line = error.line;
        this.column = error.column;
        this.length = error.length;
        this.message = error.message;
        this.name = "Lexing Error";
    }

    offset: number;
    line: number | undefined;
    column: number | undefined;
    length: number;
    message: string;
    name: string;
}

export const structurizrLexer = (structurizr: string): Either<Array<Error>, Array<IToken>> => {
    try {
        const lexingResult = StructurizrLexer.tokenize(structurizr);
        return lexingResult.errors.length === 0
            ? right(lexingResult.tokens)
            : left(lexingResult.errors.map(error => new LexingError(error)));
    }
    catch (error) {
        return left([new Error("Error while lexing structurizr")]);
    }
}

export const parseStructurizr = (tokens: Array<IToken>): Either<Array<Error>, WorkspaceCstNode> => {
    try {
        const structurizrParser = StructurizrParser.instance;
        structurizrParser.reset();
        structurizrParser.input = tokens;
        const workspaceCstNode = structurizrParser.workspace() as WorkspaceCstNode;
        return structurizrParser.errors.length === 0
            ? right(workspaceCstNode)
            : left(structurizrParser.errors.map(error => error));
    }
    catch (error) {
        return left([new Error("Error while parsing structurizr")]);
    }
};

export const visitWorkspace = (workspaceCst: WorkspaceCstNode): Either<Array<Error>, IWorkspaceSnapshot> => {
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