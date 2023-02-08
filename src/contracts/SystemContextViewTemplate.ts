import { View } from "../components/c4-view-renderer/store/C4Diagram";

export const systemContextViewTemplate: View = {
    title: "Internet Banking System",
    model: {
        people: [
            {
                identifier: "person-1",
                name: "Personal Banking Customer",
                description: "A customer of the bank, with personal bank accounts.",
                tags: [{ name: "Element" }, { name: "Person" }]
            }
        ],
        softwareSystems: [
            {
                identifier: "software-system-1",
                name: "Internet Banking System",
                description: "Allows customers to view information about their bank accounts, and make payments.",
                tags: [{ name: "Element" }, { name: "Software System" }]
            },
            {
                identifier: "software-system-4",
                name: "Mainframe Banking System",
                description: "Stores all of the core banking information about customers, accounts, transactions, etc.",
                tags: [{ name: "Element" }, { name: "Software System" }]
            },
            {
                identifier: "software-system-3",
                name: "E-mail System",
                description: "The internal Microsoft Exchange e-mail system.",
                tags: [{ name: "Element" }, { name: "Software System" }]
            }
        ],
        deploymentEnvironments: [],
        relationships: [
            {
                sourceIdentifier: "person-1",
                targetIdentifier: "software-system-1",
                description: "Views account balances, and makes payments using",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            },
            {
                sourceIdentifier: "software-system-3",
                targetIdentifier: "person-1",
                description: "Sends e-mails to",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            },
            {
                sourceIdentifier: "software-system-1",
                targetIdentifier: "software-system-3",
                description: "Sends e-mails using",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            },
            {
                sourceIdentifier: "software-system-1",
                targetIdentifier: "software-system-4",
                description: "Gets account information from, and makes payments using",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            }
        ]
    },
    layout: {
        ["person-1"]: { "x": 0, "y": 0 },
        ["software-system-1"]: { "x": 0, "y": 300 },
        ["software-system-3"]: { "x": 480, "y": 300 },
        ["software-system-4"]: { "x": 0, "y": 600 }
    },
    style: {
        element: {
            ["Person"]: {
                background: "#38A169"
            },
            ["Software System"]: {
                background: "#6B46C1"
            },
            ["Container"]: {
                background: "#3182ce"
            },
            ["Component"]: {
                background: "#90cdf4"
            },
        },
        relationship: {}
    }
}