import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const systemContextViewTemplate: View = {
    title: "Internet Banking System",
    model: {
        people: [
            {
                identifier: "pn-banking-customer",
                name: "Personal Banking Customer",
                description: "A customer of the bank, with personal bank accounts.",
                tags: [{ name: "Element" }, { name: "Person" }]
            }
        ],
        softwareSystems: [
            {
                identifier: "ss-internet-banking",
                name: "Internet Banking System",
                description: "Allows customers to view information about their bank accounts, and make payments.",
                tags: [{ name: "Element" }, { name: "Software System" }]
            },
            {
                identifier: "ss-mainframe-banking",
                name: "Mainframe Banking System",
                description: "Stores all of the core banking information about customers, accounts, transactions, etc.",
                tags: [{ name: "Element" }, { name: "Software System" }, { name: "External" }]
            },
            {
                identifier: "ss-email-system",
                name: "E-mail System",
                description: "The internal Microsoft Exchange e-mail system.",
                tags: [{ name: "Element" }, { name: "Software System" }, { name: "External" }]
            }
        ],
        deploymentEnvironments: [],
        relationships: [
            {
                sourceIdentifier: "pn-banking-customer",
                targetIdentifier: "ss-internet-banking",
                description: "Views account balances, and makes payments using",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            },
            {
                sourceIdentifier: "ss-email-system",
                targetIdentifier: "pn-banking-customer",
                description: "Sends e-mails to",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            },
            {
                sourceIdentifier: "ss-internet-banking",
                targetIdentifier: "ss-email-system",
                description: "Sends e-mails using",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            },
            {
                sourceIdentifier: "ss-internet-banking",
                targetIdentifier: "ss-mainframe-banking",
                description: "Gets account information from, and makes payments using",
                tags: [{ name: "Element" }, { name: "Relationship" }]
            }
        ]
    },
    layout: {
        ["pn-banking-customer"]: { x: 0, y: 0 },
        ["ss-internet-banking"]: { x: 0, y: 400 },
        ["ss-email-system"]: { x: 480, y: 400 },
        ["ss-mainframe-banking"]: { x: 0, y: 800 }
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
            ["External"]: {
                background: "#999999"
            }
        },
        relationship: {}
    }
}