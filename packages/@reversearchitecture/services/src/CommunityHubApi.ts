import Workspaces from "../data/community/list.json";

type Workspace = typeof Workspaces.values[0];

export class CommunityHubApi {
    async getWorkspaces(): Promise<Array<Workspace>> {
        return Promise.resolve<Array<Workspace>>(Workspaces.values);
    }
}