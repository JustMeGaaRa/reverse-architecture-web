import { IObservable, IObserver, WorkspacePreviewEvent } from "@restruct/vscode-communication";
import * as vscode from "vscode";

export class WorkspacePreviewEventObserver implements IObserver<WorkspacePreviewEvent> {
    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly panel: vscode.WebviewPanel
    ) { }

	subscribe(handler: IObservable<WorkspacePreviewEvent>) {
        const disposable = this.panel.webview.onDidReceiveMessage(handler.onNext);
        this.context.subscriptions.push(disposable);
        return disposable;
	};
}
