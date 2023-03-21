import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

type YDocProps = {
    documentId: string;
    signaling?: string[];
    password?: string;
}

export function createYDoc({
    documentId,
    signaling,
    password
}: YDocProps) {
    const document = new Y.Doc();
    const provider = new WebrtcProvider(
        documentId,
        document,
        { signaling, password }
    );
    return { document, provider };
}