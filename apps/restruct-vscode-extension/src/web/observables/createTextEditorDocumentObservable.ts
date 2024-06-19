import { createEditorDocumentChangedEvent } from "@restruct/vscode-communication";
import { fromEventPattern } from "rxjs";
import * as vscode from "vscode";

type TextDocumentChangedCallback = (event: vscode.TextDocumentChangeEvent) => void;

export const createTextEditorDocumentObservable = () => {
    return fromEventPattern(
        (handler: TextDocumentChangedCallback) => vscode.workspace.onDidChangeTextDocument(handler),
        (handler: TextDocumentChangedCallback, disposable) => disposable.dispose(),
        (event: vscode.TextDocumentChangeEvent) => createEditorDocumentChangedEvent(event.document?.getText())
    );
};
