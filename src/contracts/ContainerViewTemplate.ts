import { View } from "../components/c4-view-renderer/store/C4Diagram";

export const containerViewTemplate: View = {
    title: "",
    model: {
        people: [],
        softwareSystems: [],
        deploymentEnvironments: [],
        relationships: []
    },
    layout: {
    },
    style: {
        element: {},
        relationship: {}
    }
}