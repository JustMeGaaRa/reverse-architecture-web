import { useWorkspace } from "@justmegaara/structurizr-dsl";
import { useReactFlow } from "@reactflow/core";
import saveAs from "file-saver";
import { useCallback, useState } from "react";
import {
    exportToDrawio,
    exportToJson,
    exportToStructurizrDsl,
    exportToStructurizrJson
} from "./export";

export const useShare = () => {
    const [link] = useState(window.location.href);

    const clipboardCopy = useCallback((link) => {
        navigator.clipboard.writeText(link);
    }, [])

    return {
        link,
        clipboardCopy
    }
}

export const useExports = () => {
    const { workspace } = useWorkspace();
    const { toObject } = useReactFlow();

    const exports = [
        {
            title: "Drawio (*.drawio)",
            export: () => saveAs(exportToDrawio(workspace))
        },
        {
            title: "Structurizr DSL (*.dsl)",
            export: () => saveAs(exportToStructurizrDsl(workspace))
        },
        {
            title: "Structurizr JSON (*.json)",
            export: () => saveAs(exportToStructurizrJson(workspace))
        },
        {
            title: "React Flow (*.json)",
            export: () => saveAs(exportToJson(workspace, toObject()))
        }
    ];

    return { exports };
}