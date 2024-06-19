import { TextEditorEvent } from "@restruct/vscode-communication";
import { fromEventPattern } from "rxjs";

export const createExtensionEventObservable = () => {
    return fromEventPattern(
        (handler) => window.addEventListener("message", handler),
        (handler) => window.removeEventListener("message", handler),
        (event: MessageEvent<TextEditorEvent>) => event.data
    );
};
