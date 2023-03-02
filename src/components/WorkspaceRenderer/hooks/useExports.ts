import { useReactFlow } from "@reactflow/core";
import saveAs from "file-saver";
import { useWorkspace } from "../../../dsl";
import {
    exportToDrawio,
    exportToJson,
    exportToStructurizrDsl,
    exportToStructurizrJson
} from "../../../services/export";

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