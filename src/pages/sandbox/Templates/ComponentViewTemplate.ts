import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const componentViewTemplate: View = {
    title: "Internet Banking System - API Application",
    model: {
        people: [],
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
                        ],
                        components: [
                            {
                                identifier: "component-1",
                                name: "Sign-In Controller",
                                technology: [
                                    { name: "Spring MVC REST Controller" }
                                ],
                                description: "Allows user to sign-in in to the Internat Banking System.",
                                tags: [
                                    { name: "Element" },
                                    { name: "Component" }
                                ]
                            },
                            {
                                identifier: "component-2",
                                name: "Reset Password Controller",
                                technology: [
                                    { name: "Spring MVC REST Controller" }
                                ],
                                description: "Allows user to reset their password with a single use URL.",
                                tags: [
                                    { name: "Element" },
                                    { name: "Component" }
                                ]
                            },
                            {
                                identifier: "component-3",
                                name: "Accounts Summary Controller",
                                technology: [
                                    { name: "Spring MVC REST Controller" }
                                ],
                                description: "Provides customers with a summary of their bank accouts.",
                                tags: [
                                    { name: "Element" },
                                    { name: "Component" }
                                ]
                            },
                            {
                                identifier: "component-4",
                                name: "Security Component",
                                technology: [
                                    { name: "Spring Bean" }
                                ],
                                description: "Provides functionality related to signing in, changing passwords, etc.",
                                tags: [
                                    { name: "Element" },
                                    { name: "Component" }
                                ]
                            },
                            {
                                identifier: "component-5",
                                name: "E-mail Component",
                                technology: [
                                    { name: "Spring Bean" }
                                ],
                                description: "Sends e-mails to users.",
                                tags: [
                                    { name: "Element" },
                                    { name: "Component" }
                                ]
                            },
                            {
                                identifier: "component-6",
                                name: "Mainframe Baning System Facade",
                                technology: [
                                    { name: "Spring Bean" }
                                ],
                                description: "A facade onto the mainframe banking system.",
                                tags: [
                                    { name: "Element" },
                                    { name: "Component" }
                                ]
                            }
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
                sourceIdentifier: "container-2",
                targetIdentifier: "component-1",
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
                sourceIdentifier: "container-2",
                targetIdentifier: "component-2",
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
                sourceIdentifier: "container-2",
                targetIdentifier: "component-3",
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
                targetIdentifier: "component-1",
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
                targetIdentifier: "component-2",
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
                targetIdentifier: "component-3",
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
                sourceIdentifier: "component-1",
                targetIdentifier: "component-4",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "component-2",
                targetIdentifier: "component-4",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "component-2",
                targetIdentifier: "component-5",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "component-3",
                targetIdentifier: "component-6",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "component-4",
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
                sourceIdentifier: "component-5",
                targetIdentifier: "software-system-3",
                description: "Sends e-mails using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "component-6",
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
        ["software-system-1"]: { "x": 0, "y": 0, width: 1440, height: 1260 },
        ["software-system-3"]: { "x": 600, "y": 1020 },
        ["software-system-4"]: { "x": 1080, "y": 1020 },
        ["container-2"]: { "x": 360, "y": 60 },
        ["container-3"]: { "x": 860, "y": 60 },
        ["container-4"]: { "x": 60, "y": 320, width: 1320, height: 600 },
        ["database-1"]: { "x": 120, "y": 1020 },
        ["component-1"]: { "x": 60, "y": 60 },
        ["component-2"]: { "x": 540, "y": 60 },
        ["component-3"]: { "x": 1020, "y": 60 },
        ["component-4"]: { "x": 60, "y": 360 },
        ["component-5"]: { "x": 540, "y": 360 },
        ["component-6"]: { "x": 1020, "y": 360 },
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