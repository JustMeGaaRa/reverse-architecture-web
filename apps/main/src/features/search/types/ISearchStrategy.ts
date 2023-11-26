import { SearchItem } from "@reversearchitecture/ui";

export interface ISearchStrategy {
    readonly name: string;
    search(query: string): SearchItem[];
}