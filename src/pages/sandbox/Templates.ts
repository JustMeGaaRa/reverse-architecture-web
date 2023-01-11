import { IDiagramTemplate } from "../../components";

export const Templates: Array<IDiagramTemplate> = [
    {
        header: "System Context Diagram",
        description: "A System Context diagram is a good starting point for diagramming and documenting a software system, allowing you to step back and see the big picture. Draw a diagram showing your system as a box in the centre, surrounded by its users and the other systems that it interacts with.",
        payload: "{\n    \"diagramId\": \"ea55e78f-86e7-442c-b328-10f56d52e91b\",\n    \"title\": \"System Context Diagram\",\n    \"primaryElements\": [],\n    \"supportingElements\": [],\n    \"relationships\": [],\n    \"positions\": {}\n}"
    },
    {
        header: "Container Diagram",
        description: "The Container diagram shows the high-level shape of the software architecture and how responsibilities are distributed across it. It also shows the major technology choices and how the containers communicate with one another. It's a simple, high-level technology focussed diagram that is useful for software developers and support/operations staff alike.",
        payload: "{\n    \"diagramId\": \"d47a1f99-a05b-4752-b7eb-165daf9c970a\",\n    \"title\": \"Container Diagram\",\n    \"scope\": {\n      \"abstractionId\": \"dab269dc-92eb-40ea-b27e-754f04d10b57\",\n      \"type\": {\n        \"code\": \"container\",\n        \"name\": \"Container\"\n      },\n      \"title\": \"Container\"\n    },\n    \"primaryElements\": [],\n    \"supportingElements\": [],\n    \"relationships\": [],\n    \"positions\": {\n      \"dab269dc-92eb-40ea-b27e-754f04d10b57\": {\n        \"x\": 0,\n        \"y\": 0\n      }\n    }\n}"
    },
    {
        header: "Component Diagram",
        description: "The Component diagram shows how a container is made up of a number of \"components\", what each of those components are, their responsibilities and the technology/implementation details.",
        payload: "{\n    \"diagramId\": \"d47a1f99-a05b-4752-b7eb-165daf9c970a\",\n    \"title\": \"Component Diagram\",\n    \"scope\": {\n      \"abstractionId\": \"dab269dc-92eb-40ea-b27e-754f04d10b57\",\n      \"type\": {\n        \"code\": \"component\",\n        \"name\": \"Component\"\n      },\n      \"title\": \"Component\"\n    },\n    \"primaryElements\": [],\n    \"supportingElements\": [],\n    \"relationships\": [],\n    \"positions\": {\n      \"dab269dc-92eb-40ea-b27e-754f04d10b57\": {\n        \"x\": 0,\n        \"y\": 0\n      }\n    }\n}"
    }
];