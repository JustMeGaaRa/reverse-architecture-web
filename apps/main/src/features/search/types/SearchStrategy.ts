import { SearchGroupResult } from "@reversearchitecture/ui";
import {
    CommandSearchStrategy,
    CommunitySearchStrategy, WorkspaceSearchStrategy
} from "../types";

export class SearchStrategy {
    search(query: string): SearchGroupResult[] {
        const strategies = [
            new CommunitySearchStrategy(),
            new WorkspaceSearchStrategy(),
            new CommandSearchStrategy()
        ];

        return strategies
            .map(strategy => ({
                title: strategy.name,
                results: strategy.search(query)
            }))
            .filter(group => group.results.length > 0);
    }
}