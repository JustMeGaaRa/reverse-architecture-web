import { Page } from "iconoir-react";
import { WorkspaceApi } from "../../workspace-explorer";
import { ISearchStrategy, SearchGroup } from "../types";

export class WorkspaceSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Workspaces";
    private readonly workspaceApi: WorkspaceApi = new WorkspaceApi();

    search(query: string): Promise<SearchGroup> {
        return this.workspaceApi.getWorkspaces({ query })
            .then(workspaces => {
                return {
                    title: "Workspaces",
                    link: "/workspaces",
                    items: workspaces.slice(0, 5).map(workspace => ({
                        title: workspace.name,
                        link: `/workspaces/${workspace.workspaceId}`,
                        icon: Page,
                    }))
                }
            })
            .catch((error) => {
                console.error(error);
                return {
                    title: "Workspaces",
                    link: "/workspaces",
                    items: [],
                }
            });
    }
}