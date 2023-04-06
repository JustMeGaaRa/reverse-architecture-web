import BigBankPlc from "../data/workspaces/BigBankPlc.json";

type Workspace = typeof BigBankPlc;

export class WorkspaceApi {
    async getWorkspace(workspaceId: string): Promise<Workspace> {
        return Promise.resolve<Workspace>(BigBankPlc);
    }
}