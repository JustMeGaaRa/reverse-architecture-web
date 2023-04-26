import { ISupportPath } from "./ISupportPath";
import { ISupportVisitor } from "./ISupportVisitor";

export interface IViewStrategy extends ISupportVisitor, ISupportPath {}