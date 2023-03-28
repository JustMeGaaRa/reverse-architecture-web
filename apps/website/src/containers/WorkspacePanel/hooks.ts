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
            onClick: () => saveAs(exportToDrawio(workspace))
        },
        {
            title: "Structurizr DSL (*.dsl)",
            onClick: () => saveAs(exportToStructurizrDsl(workspace))
        },
        {
            title: "Structurizr JSON (*.json)",
            onClick: () => saveAs(exportToStructurizrJson(workspace))
        },
        {
            title: "React Flow (*.json)",
            onClick: () => saveAs(exportToJson(workspace, toObject()))
        }
    ];

    return { exports };
}