import { TokenType } from "chevrotain";
import { TokenName } from "./TokenName";

export type TokenMap = {
    [key in TokenName as string]: TokenType;
};