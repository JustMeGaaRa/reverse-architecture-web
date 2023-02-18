import saveAs from "file-saver";
import { useWorkspace } from "../../../dsl";
import { exportToDrawio, exportToJson } from "../../../services/export";

export const useExports = () => {
    const { workspace } = useWorkspace();
    const exports = [
        {
            title: "Drawio (*.drawio)",
            export: () => saveAs(exportToDrawio(workspace))
        },
        {
            title: "React Flow (*.json)",
            export: () => saveAs(exportToJson(workspace))
        }
    ];

    return { exports };
}