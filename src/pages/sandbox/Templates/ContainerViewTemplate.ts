import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const containerViewTemplate: View = {
    title: "Internet Banking System",
    model: {
        people: [
            {
                identifier: "pn-banking-customer",
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
                identifier: "ss-internet-banking",
                name: "Internet Banking System",
                tags: [
                    { name: "Element" },
                    { name: "Software System" }
                ],
                containers: [
                    {
                        identifier: "con-web-app",
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
                sourceIdentifier: "pn-banking-customer",
                targetIdentifier: "con-web-app",
                description: "Visits bigbank.com/id using",
                technology: [
                    { name: "HTTPS" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "pn-banking-customer",
                targetIdentifier: "con-single-page-app",
                description: "Views account balances, and makes payments using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "pn-banking-customer",
                targetIdentifier: "con-mobile-app",
                description: "Views account balances, and makes payments using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "ss-email-system",
                targetIdentifier: "pn-banking-customer",
                description: "Sends e-mails to",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "con-web-app",
                targetIdentifier: "con-single-page-app",
                description: "Delivers to the customer's web browser",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "con-single-page-app",
                targetIdentifier: "con-api-application",
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
                targetIdentifier: "con-api-application",
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
                sourceIdentifier: "con-api-application",
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
                sourceIdentifier: "con-api-application",
                targetIdentifier: "ss-email-system",
                description: "Sends e-mails using",
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "con-api-application",
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
        ["pn-banking-customer"]: { x: 800, y: 0 },
        ["ss-internet-banking"]: { x: 0, y: 380, width: 1320, height: 720 },
        ["ss-email-system"]: { x: 1500, y: 420 },
        ["ss-mainframe-banking"]: { x: 1500, y: 820 },
        ["con-web-app"]: { x: 40, y: 40 },
        ["con-single-page-app"]: { x: 640, y: 40 },
        ["con-mobile-app"]: { x: 980, y: 40 },
        ["con-api-application"]: { x: 800, y: 440 },
        ["db-database-1"]: { x: 40, y: 440 },
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