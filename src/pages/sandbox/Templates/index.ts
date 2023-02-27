import { DiagramTemplateGroup } from "../../../components";

export const templates: DiagramTemplateGroup[] = [
    {
        header: "Blank",
        templates: [
            {
                header: "Blank Diagram",
                description: "A new empty diagram to start from scratch.",
                payload: JSON.stringify({ type: "Empty" })
            }
        ]
    },
    {
      header: "Finance",
      templates: [
            {
                header: "Internet Banking System",
                description: "A System Context diagram is a good starting point for diagramming and documenting a software system, allowing you to step back and see the big picture. Draw a diagram showing your system as a box in the centre, surrounded by its users and the other systems that it interacts with.",
                payload: JSON.stringify({ identifier: "ss-internet-banking" })
            }
        ]
    },
    {
        header: "Security",
        templates: []
    },
    {
        header: "Media",
        templates: []
    }
]