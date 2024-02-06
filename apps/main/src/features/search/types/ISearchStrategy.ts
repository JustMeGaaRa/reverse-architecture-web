import { SearchItem } from "./SearchGroupResult";

export interface ISearchStrategy {
    readonly name: string;
    search(query: string): Promise<Array<SearchItem>>;
}