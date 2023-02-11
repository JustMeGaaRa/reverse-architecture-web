import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const containerViewTemplate: View = {
    title: "Internet Banking System",
    model: {
        people: [
            {
                identifier: "person-1",
                name: "Personal Banking Customer",
                description: "A customer of the bank, with personal bank accounts.",
                tags: [
                    { name: "Element" },
                    { name: "Person" }
                ]
            }
        ],
        softwareSystems: [
            {
                identifier: "software-system-1",
                name: "Internet Banking System",
                tags: [
                    { name: "Element" },
                    { name: "Software System" }
                ],
                containers: [
                    {
                        identifier: "container-1",
                        name: "Web Application",
                        technology: [
                            { name: "Java" },
                            { name: "Spring MVC" }
                        ],
                        description: "Delivers the static content and the Internet banking single page application.",
                        tags: [
                            { name: "Element" },
                            { name: "Container" }
                        ]
                    },
                    {
                        identifier: "container-2",
                        name: "Single-Page Application",
                        technology: [
                            { name: "JavaScript" },
                            { name: "Angular" }
                        ],
                        description: "Provides all of the Internet banking functionality to customers via their web browser.",
                        tags: [
                            { name: "Element" },
                            { name: "Container" }
                        ]
                    },
                    {
                        identifier: "container-3",
                        name: "Mobile App",
                        technology: [
                            { name: "Xamarin" }
                        ],
                        description: "Provides limited subset of the Internet banking functionality to the customers via their mobile device.",
                        tags: [
                            { name: "Element" },
                            { name: "Container" }
                        ]
                    },
                    {
                        identifier: "container-4",
                        name: "API Application",
                        technology: [
                            { name: "Java" },
                            { name: "Spring MVC" }
                        ],
                        description: "Provides Internet banking functionality via a JSON/HTTPS API.",
                        tags: [
                            { name: "Element" },
                            { name: "Container" }
                        ]
                    },
                    {
                        identifier: "database-1",
                        name: "Database",
                        technology: [
                            { name: "Oracle Database Schema" }
                        ],
                        description: "Stores user registration information, hashed authentication credential, access logs, etc.",
                        tags: [
                            { name: "Element" },
                            { name: "Container" }
                        ]
                    }
                ]
            },
            {
                identifier: "software-system-3",
                name: "E-mail System",
                description: "The internal Microsoft Exchange e-mail system.",
                tags: [
                    { name: "Element" },
                    { name: "Software System" },
                    { name: "External" }
                ]
            },
            {
                identifier: "software-system-4",
                name: "Mainframe Banking System",
                description: "Stores all of the core banking information about customers, accounts, transactions, etc.",
                tags: [
                    { name: "Element" },
                    { name: "Software System" },
                    { name: "External" }
                ]
            }
        ],
        deploymentEnvironments: [],
        relationships: [
            {
                sourceIdentifier: "person-1",
                targetIdentifier: "container-1",
                description: "Visits bigbank.com/id using",
                technology: [
                    { name: "HTTPS" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "person-1",
                targetIdentifier: "container-2",
                description: "Views account balances, and makes payments using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "person-1",
                targetIdentifier: "container-3",
                description: "Views account balances, and makes payments using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "software-system-3",
                targetIdentifier: "person-1",
                description: "Sends e-mails to",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "container-1",
                targetIdentifier: "container-2",
                description: "Delivers to the customer's web browser",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "container-2",
                targetIdentifier: "container-4",
                description: "Makes API calls to",
                technology: [
                    { name: "JSON" },
                    { name: "HTTPS" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "container-3",
                targetIdentifier: "container-4",
                description: "Makes API calls to",
                technology: [
                    { name: "JSON" },
                    { name: "HTTPS" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "container-4",
                targetIdentifier: "database-1",
                description: "Reads from and writes to",
                technology: [
                    { name: "JDBC" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "container-4",
                targetIdentifier: "software-system-3",
                description: "Sends e-mails using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "container-4",
                targetIdentifier: "software-system-4",
                description: "Makes API calls to",
                technology: [
                    { name: "XML" },
                    { name: "HTTPS" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            }
        ]
    },
    layout: {
        ["person-1"]: { "x": 720, "y": 0 },
        ["software-system-1"]: { "x": 0, "y": 250, width: 1200, height: 600 },
        ["software-system-3"]: { "x": 1300, "y": 300 },
        ["software-system-4"]: { "x": 1300, "y": 600 },
        ["container-1"]: { "x": 60, "y": 50 },
        ["container-2"]: { "x": 560, "y": 50 },
        ["container-3"]: { "x": 900, "y": 50 },
        ["container-4"]: { "x": 720, "y": 350 },
        ["database-1"]: { "x": 60, "y": 350 },
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