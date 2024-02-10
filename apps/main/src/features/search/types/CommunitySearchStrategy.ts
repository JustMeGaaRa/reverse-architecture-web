import { Page } from "iconoir-react";
import { CommunityApi } from "../../community";
import { ISearchStrategy, SearchGroup, SearchItem } from "../types";

export class CommunitySearchStrategy implements ISearchStrategy {
    public readonly name: string = "Community";
    private readonly workspaceApi: CommunityApi = new CommunityApi();
    
    search(query: string): Promise<SearchGroup> {
        return this.workspaceApi.getWorkspaces(query)
            .then(workspaces => {
                return {
                    title: "Community",
                    link: "/community",
                    items: workspaces.slice(0, 5).map(workspace => ({
                        title: workspace.name,
                        link: `/community?preview=${workspace.workspaceId}`,
                        icon: Page,
                    }))
                };
            });
    }
}