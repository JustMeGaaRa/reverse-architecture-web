import {
    parseStructurizr,
    structurizrLexer,
    visitWorkspace,
    WorkspaceCstNode
} from "@structurizr/parser";
import { EventName, IObservable, TextEditorEvent } from "@restruct/vscode-communication";
import * as vscode from "vscode";
import { fold, chain } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

export class TextEditorDocumentChangedHandler implements IObservable<TextEditorEvent> {
    constructor(
        private readonly panel: vscode.WebviewPanel
    ) {}

    onNext(event: TextEditorEvent) {
        if (event.type === EventName.EDITOR_DOCUMENT_CHANGED) {
            if (vscode.window.activeTextEditor) {
                pipe(
                    structurizrLexer(event.structurizr),
                    chain(parseStructurizr),
                    chain(visitWorkspace),
                    fold(
                        errors => {
                            console.debug("Error while parsing the structurizr", errors);
                        },
                        workspace => {
                            this.panel.webview.postMessage({
                                type: EventName.EDITOR_WORKSPACE_CHANGED,
                                workspace
                            });
                        }
                    )
                );
            }
        }
    }

    onError(error: Error) {
        console.error(error);
    }
}