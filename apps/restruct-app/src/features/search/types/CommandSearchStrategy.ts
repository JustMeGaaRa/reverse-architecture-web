import { TerminalTag } from "iconoir-react";
import { ISearchStrategy, SearchGroup } from "../types";

export class CommandSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Commands";

    search(query: string): Promise<SearchGroup> {
        const chunks = query.split(" ")
            .map(chunk => chunk.trim())
            .filter(chunk => chunk.length > 0);

        const items = [
            {
                title: "New workspace",
                link: "?help=commands",
                icon: TerminalTag,
            },
            {
                title: "New from template",
                link: "?help=commands",
                icon: TerminalTag,
            },
            {
                title: "Publish to community",
                link: "?help=commands",
                icon: TerminalTag,
            }
        ];

        if (query.trim() === "") {
            return Promise.resolve({
                title: "Commands",
                link: "?help=commands",
                items: items
            });
        }

        return Promise.resolve({
            title: "Commands",
            link: "?help=commands",
            items: items.filter(item => {
                return chunks.some(chunk => item.title.toLowerCase().includes(chunk.toLowerCase()))
                    || query.trim().length === 0
            })
        });
    }
}