import { Diagram } from "../types";

export function exportToJson(diagram: Diagram): string {
    const json = JSON.stringify(diagram);
    return json;
}
