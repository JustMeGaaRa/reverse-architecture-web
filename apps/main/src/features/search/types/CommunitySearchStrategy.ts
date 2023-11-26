import { SearchItem } from "@reversearchitecture/ui";
import { Page } from "iconoir-react";
import { ISearchStrategy } from "../types";

export class CommunitySearchStrategy implements ISearchStrategy {
    public readonly name: string = "Community";
    
    search(query: string): SearchItem[] {
        const chunks = query.split(" ");
        return [
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
        ].filter(item => chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase())));
    }
}