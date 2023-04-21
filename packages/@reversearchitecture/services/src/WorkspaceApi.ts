import { Workspace } from "@justmegaara/structurizr-dsl";
import { BigBankPlc } from "./data/workspaces/BigBankPlc";

export class WorkspaceApi {
    async getWorkspace(workspaceId: string): Promise<Workspace> {
        return Promise.resolve<Workspace>(BigBankPlc);
    }
}