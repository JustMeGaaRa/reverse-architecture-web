import { View } from "../components/c4-view-renderer/store/C4Diagram";

export const emptyViewTemplate: View = {
    title: "Diagram",
    model: {
        people: [],
        softwareSystems: [],
        deploymentEnvironments: [],
        relationships: []
    },
    layout: {},
    style: {
        element: {},
        relationship: {}
    }
}