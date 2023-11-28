import { SearchGroupResult } from "@reversearchitecture/ui";
import {
    CommandSearchStrategy,
    CommunitySearchStrategy, RecentSearchStrategy, WorkspaceSearchStrategy
} from "../types";

export class SearchStrategy {
    async search(query: string): Promise<SearchGroupResult[]> {
        const strategies = [
            new RecentSearchStrategy(),
            new CommunitySearchStrategy(),
            new WorkspaceSearchStrategy(),
            new CommandSearchStrategy()
        ];

        const groups = await Promise.all(strategies
            .map(async strategy => {
                const results = await strategy.search(query.trim());
                return {
                    title: strategy.name,
                    results: results
                }
            }));

        return Promise.resolve(groups.filter(group => group.results.length > 0));
    }
}