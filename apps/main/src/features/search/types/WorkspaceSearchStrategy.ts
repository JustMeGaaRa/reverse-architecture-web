import { SearchItem } from "@reversearchitecture/ui";
import { Page } from "iconoir-react";
import { ISearchStrategy } from "../types";

export class WorkspaceSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Workspaces";

    search(query: string): SearchItem[] {
        const chunks = query.split(" ");
        return [
            {
                text: "Financial Security",
                icon: Page,
            },
            {
                text: "Internet Banking Application",
                icon: Page,
            },
            {
                text: "GDPR Compliance",
                icon: Page,
            }
        ].filter(item => chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase())));
    }
}