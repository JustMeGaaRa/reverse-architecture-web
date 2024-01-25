import { SearchItem } from "@reversearchitecture/ui";
import { Page } from "iconoir-react";
import { CommunityApi } from "../../community";
import { ISearchStrategy } from "../types";

export class CommunitySearchStrategy implements ISearchStrategy {
    public readonly name: string = "Community";
    private readonly workspaceApi: CommunityApi = new CommunityApi();
    
    search(query: string): Promise<Array<SearchItem>> {
        return this.workspaceApi.getWorkspaces(query)
            .then(workspaces => {
                return workspaces.slice(0, 5).map(workspace => ({
                    text: workspace.name,
                    icon: Page,
                }))
            });
    }
}