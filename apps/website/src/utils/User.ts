import {
    adjectives,
    animals,
    colors,
    Config,
    uniqueNamesGenerator
} from "unique-names-generator";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { User } from "../components";

const sample = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const createRandomUser = (): User => {
    const customConfig: Config = {
        dictionaries: [adjectives, colors, animals],
        separator: " ",
        style: "capital"
    };

    const shortName = uniqueNamesGenerator(customConfig);

    const USER_COLORS = [
        "#EC5E41",
        "#F2555A",
        "#F04F88",
        "#E34BA9",
        "#BD54C6",
        "#9D5BD2",
        "#7B66DC",
        "#5373E6",
        "#369EFF",
        "#02B1CC",
        "#11B3A3",
        "#39B178",
        "#55B467",
        "#FF802B"
    ];

    return {
        username: shortName,
        fullname: shortName,
        avatarUrl: "",
        point: { x: 0, y: 0 },
        color: sample(USER_COLORS),
        isActive: false
    };
}

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