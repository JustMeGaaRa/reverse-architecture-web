import { useReactFlow } from "@reactflow/core";
import saveAs from "file-saver";
import { exportToDrawio, exportToJson } from "../../../services/export";

export const useExports = () => {
    const { toObject } = useReactFlow();
    const exports = [
        {
            title: "Drawio (*.drawio)",
            export: (filename: string) => saveAs(exportToDrawio(filename, toObject()))
        },
        {
            title: "React Flow (*.json)",
            export: (filename: string) => saveAs(exportToJson(filename, toObject()))
        }
    ];

    return { exports };
}