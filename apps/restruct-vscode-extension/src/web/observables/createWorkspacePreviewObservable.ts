import { WorkspacePreviewEvent } from "@restruct/vscode-communication";
import { fromEventPattern } from "rxjs";
import * as vscode from "vscode";

type WorkspaceChangedcallback = (event: WorkspacePreviewEvent) => void;

export const createWorkspacePreviewObservable = (panel: vscode.WebviewPanel) => {
    return fromEventPattern(
        (handler: WorkspaceChangedcallback) => panel.webview.onDidReceiveMessage(handler),
        (handler: WorkspaceChangedcallback, disposable) => disposable.dispose(),
        (event: WorkspacePreviewEvent) => event
    );
};
