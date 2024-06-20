import { VscodeExtensionEvent } from "@restruct/vscode-communication";
import { fromEventPattern } from "rxjs";
import * as vscode from "vscode";

type WorkspaceChangedcallback = (event: VscodeExtensionEvent) => void;

export const createWorkspacePreviewObservable = (panel: vscode.WebviewPanel) => {
    return fromEventPattern(
        (handler: WorkspaceChangedcallback) => panel.webview.onDidReceiveMessage(handler),
        (handler: WorkspaceChangedcallback, disposable) => disposable.dispose(),
        (event: VscodeExtensionEvent) => event
    );
};
