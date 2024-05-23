import * as vscode from 'vscode';
import { MessageType, TextEditorEvent, WorkspaceEvent } from './messages';

export class CommunicationChannel {
    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly panel: vscode.WebviewPanel
    ) { }

	publishMessage(message: TextEditorEvent) {
        return this.panel.webview.postMessage(message);
	};

	subscribeMessage(callback: (message: WorkspaceEvent) => void) {
        const disposable = this.panel.webview.onDidReceiveMessage(callback);
        this.context.subscriptions.push(disposable);
        return disposable;
	};
}

export const handleWebviewMessage = (message: WorkspaceEvent) => {
    switch (message.type) {
        case MessageType.ELEMENT_HOVERED:
            console.log("Element hovered", message);
            break;
    }
};