import { IObservable, EventName, WorkspacePreviewEvent } from "@restruct/vscode-communication";
import { GraphvizLayoutStrategy } from "@structurizr/graphviz-layout";

export class WorkspaceViewChangedHandler implements IObservable<WorkspacePreviewEvent> {
    onNext(event: WorkspacePreviewEvent) {
        if (event.type === EventName.WORKSPACE_VIEW_CHANGED) {
            const strategy = new GraphvizLayoutStrategy();
        }
    }

    onError(error: Error) {
        console.error(error);
    }
}