import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const componentViewTemplate: View = {
    title: "Internet Banking System - API Application",
    model: {
        people: [],
        softwareSystems: [
            {
                identifier: "ss-internet-banking",
                name: "Internet Banking System",
                tags: [
                    { name: "Element" },
                    { name: "Software System" }
                ],
                containers: [
                    {
                        identifier: "con-api-application",
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
                                identifier: "cmp-signin-ctrl",
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
                                identifier: "cmp-reset-pwd-ctrl",
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
                                identifier: "cmp-accounts-summary-ctrl",
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
                                identifier: "cmp-security-component",
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
                                identifier: "cmp-email-component",
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
                                identifier: "cmp-mainframe-facade",
                                name: "Mainframe Banking System Facade",
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
                        identifier: "con-single-page-app",
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
                        identifier: "con-mobile-app",
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
                        identifier: "db-database-1",
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
                identifier: "ss-email-system",
                name: "E-mail System",
                description: "The internal Microsoft Exchange e-mail system.",
                tags: [
                    { name: "Element" },
                    { name: "Software System" },
                    { name: "External" }
                ]
            },
            {
                identifier: "ss-mainframe-banking",
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
                sourceIdentifier: "con-single-page-app",
                targetIdentifier: "cmp-signin-ctrl",
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
                sourceIdentifier: "con-single-page-app",
                targetIdentifier: "cmp-reset-pwd-ctrl",
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
                sourceIdentifier: "con-single-page-app",
                targetIdentifier: "cmp-accounts-summary-ctrl",
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
                sourceIdentifier: "con-mobile-app",
                targetIdentifier: "cmp-signin-ctrl",
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
                sourceIdentifier: "con-mobile-app",
                targetIdentifier: "cmp-reset-pwd-ctrl",
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
                sourceIdentifier: "con-mobile-app",
                targetIdentifier: "cmp-accounts-summary-ctrl",
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
                sourceIdentifier: "cmp-signin-ctrl",
                targetIdentifier: "cmp-security-component",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "cmp-reset-pwd-ctrl",
                targetIdentifier: "cmp-security-component",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "cmp-reset-pwd-ctrl",
                targetIdentifier: "cmp-email-component",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "cmp-accounts-summary-ctrl",
                targetIdentifier: "cmp-mainframe-facade",
                description: "Uses",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "cmp-security-component",
                targetIdentifier: "db-database-1",
                description: "Reads from and writes to",
                technology: [
                    { name: "JDBC" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "cmp-email-component",
                targetIdentifier: "ss-email-system",
                description: "Sends e-mails using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "cmp-mainframe-facade",
                targetIdentifier: "ss-mainframe-banking",
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
        ["ss-internet-banking"]: { x: 0, y: 0, width: 1660, height: 1380 },
        ["ss-email-system"]: { x: 680, y: 1100 },
        ["ss-mainframe-banking"]: { x: 1280, y: 1100 },
        ["con-single-page-app"]: { x: 380, y: 40 },
        ["con-mobile-app"]: { x: 980, y: 40 },
        ["con-api-application"]: { x: 40, y: 380, width: 1580, height: 600 },
        ["db-database-1"]: { x: 80, y: 1100 },
        ["cmp-signin-ctrl"]: { x: 40, y: 40 },
        ["cmp-reset-pwd-ctrl"]: { x: 640, y: 40 },
        ["cmp-accounts-summary-ctrl"]: { x: 1240, y: 40 },
        ["cmp-security-component"]: { x: 40, y: 320 },
        ["cmp-email-component"]: { x: 640, y: 320 },
        ["cmp-mainframe-facade"]: { x: 1240, y: 320 },
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