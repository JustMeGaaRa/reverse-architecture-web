import { SearchItem } from "@reversearchitecture/ui";
import { Page } from "iconoir-react";
import { ISearchStrategy } from "../types";

export class CommunitySearchStrategy implements ISearchStrategy {
    public readonly name: string = "Community";
    
    search(query: string): Promise<Array<SearchItem>> {
        const chunks = query.split(" ")
            .map(chunk => chunk.trim())
            .filter(chunk => chunk.length > 0);
        
        const items = [
            {
                text: "Search Engine",
                icon: Page,
            },
            {
                text: "Social Media Platform",
                icon: Page,
            },
            {
                text: "E-commerce Platform",
                icon: Page,
            }
        ];

        if (query.trim() === "") {
            return Promise.resolve(items.slice(0, 3));
        }

        return Promise.resolve(items.filter(item => {
            return chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase()))
                || query.trim().length === 0
        }));
    }
}