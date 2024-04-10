import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { Workspace as YWorkspace } from "@structurizr/y-workspace";
import { useEffect } from "react";
import * as Y from "yjs";

export type WorkspaceSyncCallbacks = {
    onWorkspaceUpdate: (workspace: IWorkspaceSnapshot) => void;
}

export const useOnWorkspaceSync = (document: Y.Doc, callbacks: WorkspaceSyncCallbacks) => {
    const { onWorkspaceUpdate } = callbacks;
    
    useEffect(() => {
        if (document) {
            const yworkspace = new YWorkspace(document);

            const onWorkspaceUpdateObservable = () => {
                onWorkspaceUpdate(yworkspace.toSnapshot());
            }

            yworkspace.subscribe(onWorkspaceUpdateObservable);

            return () => {
                yworkspace.unsubscribe(onWorkspaceUpdateObservable);
            }
        }
    }, [document, onWorkspaceUpdate]);
}