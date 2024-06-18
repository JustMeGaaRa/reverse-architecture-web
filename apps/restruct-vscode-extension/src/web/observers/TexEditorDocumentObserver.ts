import { EventName, IObservable, IObserver, TextEditorEvent } from "@restruct/vscode-communication";
import * as vscode from "vscode";

export class TextEditorDocumentObserver implements IObserver<TextEditorEvent> {
    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

    subscribe(handler: IObservable<TextEditorEvent>) {
        const handlerAdapter = (event: vscode.TextDocumentChangeEvent) => {
            handler.onNext({
                type: EventName.DOCUMENT_CHANGED,
                structurizr: event.document?.getText()
            });
        };

        const disposable = vscode.workspace.onDidChangeTextDocument(handlerAdapter);
        this.context.subscriptions.push(disposable);
        return disposable;
    };
}