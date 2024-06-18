import { IObservable, EventName, WorkspacePreviewEvent } from "@restruct/vscode-communication";
import { GraphvizLayoutStrategy } from "@structurizr/graphviz-layout";

export class WorkspaceViewChangedHandler implements IObservable<WorkspacePreviewEvent> {
    onNext(event: WorkspacePreviewEvent) {
        if (event.type === EventName.VIEW_CHANGED) {
            console.log("View changed", event);
        }
    }

    onError(error: Error) {
        console.error(error);
    }
}