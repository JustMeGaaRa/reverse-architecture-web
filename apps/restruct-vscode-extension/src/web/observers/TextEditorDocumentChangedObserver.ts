import { parseWorkspace } from "@structurizr/parser";
import {
    createEditorWorkspaceChangedEvent,
    EventName,
    TextEditorEvent
} from "@restruct/vscode-communication";
import * as vscode from "vscode";
import { Observer } from "rxjs";

export class TextEditorDocumentChangedObserver implements Observer<TextEditorEvent> {
    constructor(
        private readonly panel: vscode.WebviewPanel
    ) {}

    next(event: TextEditorEvent) {
        if (event.type === EventName.EDITOR_DOCUMENT_CHANGED) {
            parseWorkspace(
                event.structurizr,
                (error) => {
                    /* TODO: report syntax errors to vscode */
                },
                (workspace) => {
                    const nextEvent = createEditorWorkspaceChangedEvent(workspace);
                    this.panel.webview.postMessage(nextEvent);
                }
            );
        }
    }

    error(error: Error) {
        vscode.window.showErrorMessage(error.message);
    }

    complete() {
        console.debug("TextEditorDocumentChangedHandler completed");
    }
}
