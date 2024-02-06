import { Page } from "iconoir-react";
import { WorkspaceApi } from "../../workspaces";
import { ISearchStrategy, SearchItem } from "../types";

export class WorkspaceSearchStrategy implements ISearchStrategy {
    public readonly name: string = "Workspaces";
    private readonly workspaceApi: WorkspaceApi = new WorkspaceApi();

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