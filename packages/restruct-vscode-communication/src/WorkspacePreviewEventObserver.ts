import * as vscode from 'vscode';
import { EventName, TextEditorEvent, WorkspacePreviewEvent } from './EventName';

export interface IDisposable {
    dispose: () => void;
}

export interface IObservable<TEvent> {
    onNext: (event: TEvent) => void;
    onError: (error: Error) => void;
}

export interface IObserver<TEvent> {
    subscribe: (handler: IObservable<TEvent>) => IDisposable;
}

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
