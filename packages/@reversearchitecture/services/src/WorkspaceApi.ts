import { Workspace, WorkspaceLayout } from "@structurizr/dsl";
import { BigBankPlc } from "./data/workspaces/BigBankPlc";
import { BigBankPlcLayout } from "./data/workspaces/BigBankPlc.layout";

export class WorkspaceApi {
    async getWorkspace(workspaceId: string): Promise<Workspace> {
        return Promise.resolve<Workspace>(BigBankPlc);
    }

    async getWorkspaceLayout(workspaceId: string): Promise<WorkspaceLayout> {
        return Promise.resolve<WorkspaceLayout>(BigBankPlcLayout);
    }
}