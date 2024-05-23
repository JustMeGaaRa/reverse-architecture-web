import { ISearchStrategy, SearchGroup } from "../types";

export class RecentSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Recent";
    
    search(query: string): Promise<SearchGroup> {
        const chunks = query.split(" ");
        return Promise.resolve({
            title: "Recent",
            link: "",
            items: []
                .filter(item => chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase())))
        });
    }
}