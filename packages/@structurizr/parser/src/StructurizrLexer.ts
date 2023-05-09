import { Lexer } from "chevrotain";
import { allTokens } from "./Tokens";

export const StructurizrLexer = new Lexer(allTokens);
