import { SearchGroup } from "./SearchGroupResult";

export interface ISearchStrategy {
    readonly name: string;
    search(query: string): Promise<SearchGroup>;
}