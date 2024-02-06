import { TerminalTag } from "iconoir-react";
import { ISearchStrategy, SearchItem } from "../types";

export class CommandSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Commands";

    search(query: string): Promise<Array<SearchItem>> {
        const chunks = query.split(" ")
            .map(chunk => chunk.trim())
            .filter(chunk => chunk.length > 0);

        const items = [
            {
                text: "New workspace",
                icon: TerminalTag,
            },
            {
                text: "New from template",
                icon: TerminalTag,
            },
            {
                text: "Publish to community",
                icon: TerminalTag,
            }
        ];

        if (query.trim() === "") {
            return Promise.resolve(items);
        }

        return Promise.resolve(items.filter(item => {
            return chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase()))
                || query.trim().length === 0
        }));
    }
}