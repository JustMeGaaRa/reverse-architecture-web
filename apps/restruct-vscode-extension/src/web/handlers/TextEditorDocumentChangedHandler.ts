import { EventName, IObservable, TextEditorEvent } from "@restruct/vscode-communication";
import * as vscode from "vscode";

export class TextEditorDocumentChangedHandler implements IObservable<TextEditorEvent> {
    constructor(
        private readonly panel: vscode.WebviewPanel
    ) {}

    onNext(event: TextEditorEvent) {
        if (event.type === EventName.DOCUMENT_CHANGED) {
            console.log("Document changed", event);

            if (vscode.window.activeTextEditor) {
                const structurizr = vscode.window.activeTextEditor.document.getText();
                this.panel.webview.postMessage({ type: EventName.DOCUMENT_CHANGED, structurizr });
            }
        }
    }

    onError(error: Error) {
        console.error(error);
    }
}