import { DiagramTemplateGroup } from "../components";
import { componentViewTemplate } from "./ComponentViewTemplate";
import { containerViewTemplate } from "./ContainerViewTemplate";
import { emptyViewTemplate } from "./EmptyViewTemplate";
import { systemContextViewTemplate } from "./SystemContextViewTemplate";

export const templates: DiagramTemplateGroup[] = [
    {
        header: "Blank",
        templates: [
            {
                header: "New Empty Diagram",
                description: "A new empty diagram to start from scratch.",
                payload: JSON.stringify(emptyViewTemplate)
            }
        ]
    },
    {
      header: "C4 Core Diagrams",
      templates: [
            {
                header: "System Context Diagram",
                description: "A System Context diagram is a good starting point for diagramming and documenting a software system, allowing you to step back and see the big picture. Draw a diagram showing your system as a box in the centre, surrounded by its users and the other systems that it interacts with.",
                payload: JSON.stringify(systemContextViewTemplate)
            },
            {
                header: "Container Diagram",
                description: "The Container diagram shows the high-level shape of the software architecture and how responsibilities are distributed across it. It also shows the major technology choices and how the containers communicate with one another. It's a simple, high-level technology focussed diagram that is useful for software developers and support/operations staff alike.",
                payload: JSON.stringify(containerViewTemplate)
            },
            {
                header: "Component Diagram",
                description: "The Component diagram shows how a container is made up of a number of \"components\", what each of those components are, their responsibilities and the technology/implementation details.",
                payload: JSON.stringify(componentViewTemplate)
            }
        ]
    },
    {
        header: "C4 Supplementary Diagrams",
        templates: [
            {
                header: "System Landscape Diagram",
                description: "Essentially this is a high-level map of the software systems at the enterprise level, with a C4 drill-down for each software system of interest. From a practical perspective, a system landscape diagram is really just a system context diagram without a specific focus on a particular software system.",
                payload: JSON.stringify(systemContextViewTemplate)
            },
            {
                header: "Dynamic Diagram",
                description: "A dynamic diagram can be useful when you want to show how elements in a static model collaborate at runtime to implement a user story, use case, feature, etc. This dynamic diagram is based upon a UML communication diagram.",
                payload: JSON.stringify(systemContextViewTemplate)
            },
            {
                header: "Deployment Diagram",
                description: "A deployment diagram allows you to illustrate how software systems and/or containers in the static model are mapped to infrastructure. This deployment diagram is based upon a UML deployment diagram, although simplified slightly to show the mapping between containers and deployment nodes.",
                payload: JSON.stringify(systemContextViewTemplate)
            }
        ]
    }
]