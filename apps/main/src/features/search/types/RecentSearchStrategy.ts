import { ISearchStrategy, SearchItem } from "../types";

export class RecentSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Recent";
    
    search(query: string): Promise<Array<SearchItem>> {
        const chunks = query.split(" ");
        return Promise.resolve([]
            .filter(item => chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase()))));
    }
}