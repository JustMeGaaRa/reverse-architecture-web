import { IDisposable, IObservable, IObserver, TextEditorEvent } from "@restruct/vscode-communication";

export class ExtensionEventObserver implements IObserver<TextEditorEvent> {
    subscribe(handler: IObservable<TextEditorEvent>) {
        const eventAdapter = (event: MessageEvent<TextEditorEvent>) => {
            try {
                handler.onNext(event.data);
            }
            catch (error) {
                handler.onError(error);
            }
        }
        window.addEventListener("message", eventAdapter);

        return {
            dispose: () => window.removeEventListener("message", eventAdapter)
        } as IDisposable;
    }
}