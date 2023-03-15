import { WorkspaceActions } from "./WorkspaceActions";
import { WorkspaceState } from "./WorkspaceState";
export type WorkspaceStore = WorkspaceState & WorkspaceActions;
export declare const useWorkspace: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<WorkspaceStore>, "setState"> & {
    setState(nextStateOrUpdater: WorkspaceStore | Partial<WorkspaceStore> | ((state: import("immer/dist/internal").WritableDraft<WorkspaceStore>) => void), shouldReplace?: boolean): void;
}>;
//# sourceMappingURL=index.d.ts.map