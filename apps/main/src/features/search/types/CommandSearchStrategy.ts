import { SearchItem } from "@reversearchitecture/ui";
import { TerminalTag } from "iconoir-react";
import { ISearchStrategy } from "../types";

export class CommandSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Commands";

    search(query: string): SearchItem[] {
        const chunks = query.split(" ");
        return [
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
        ].filter(item => chunks.some(chunk => item.text.toLowerCase().includes(chunk.toLowerCase())));
    }
}