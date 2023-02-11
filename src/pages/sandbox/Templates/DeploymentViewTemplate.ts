import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const deploymentViewTemplate: View = {
    title: "Internet Banking System",
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
        deploymentEnvironments: [
            {
                identifier: "live-env",
                name: "Live",
                deploymentNodes: [
                    {
                        identifier: "dn-customers-computer",
                        name: "Customer's Computer",
                        technology: [
                            { name: "Microsoft Windows or Apple macOS" }
                        ],
                        tags: [
                            { name: "Element" },
                            { name: "Deployment Node" }
                        ],
                        deploymentNodes: [
                            {
                                identifier: "dn-web-browser",
                                name: "Web Browser",
                                technology: [
                                    { name: "Chrome, Firefox, Safari, or Edge" }
                                ],
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                containerInstances: [
                                    {
                                        containerIdentifier: "con-single-page-app"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        identifier: "dn-customers-mobile",
                        name: "Customer's Mobile Device",
                        technology: [
                            { name: "Apple iOS or Android" }
                        ],
                        tags: [
                            { name: "Element" },
                            { name: "Deployment Node" }
                        ],
                        containerInstances: [
                            {
                                containerIdentifier: "con-mobile-app"
                            }
                        ]
                    },
                    {
                        identifier: "dn-big-bank-plc",
                        name: "Big Bank plc",
                        technology: [
                            { name: "Big Bank plc data center" }
                        ],
                        tags:[
                            { name: "Element" },
                            { name: "Deployment Node" }
                        ],
                        deploymentNodes: [
                            {
                                identifier: "dn-bigbank-web",
                                name: "bigbank-web***",
                                instances: 4,
                                technology: [
                                    { name: "Ubuntu 16.04 LTS" }
                                ],
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-apache-tomcat-1",
                                        name: "Apache Tomcat",
                                        technology: [
                                            { name: "Apache Tomcat 8.x" }
                                        ],
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "con-web-app"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-api",
                                name: "bigbank-api***",
                                instances: 8,
                                technology: [
                                    { name: "Ubuntu 16.04.LTS" }
                                ],
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-apache-tomcat-2",
                                        name: "Apache Tomcat",
                                        technology: [
                                            { name: "Apache Tomcat 8.x" }
                                        ],
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "con-api-application"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-db01",
                                name: "bigbank-db01",
                                technology: [
                                    { name: "Ubuntu 16.04 LTS" }
                                ],
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-oracle-primary",
                                        name: "Oracle - Primary",
                                        technology: [
                                            { name: "Oracle 12c" }
                                        ],
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "db-database-1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-db02",
                                name: "bigbank-db02",
                                technology: [
                                    { name: "Ubuntu 16.04 LTS" }
                                ],
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" },
                                    { name: "Secondary" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-oracle-secondary",
                                        name: "Oracle - Secondary",
                                        technology: [
                                            { name: "Oracle 12c" }
                                        ],
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "db-database-1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-prod001",
                                name: "bigbank-prod001",
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                softwareSystemInstances: [
                                    {
                                        softwareSystemIdentifier: "ss-mainframe-banking"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        relationships: [
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
                targetIdentifier: "ss-mainframe-banking",
                description: "Makes API calls to",
                technology: [
                    { name: "XML" },
                    { name: "HTTPS" }
                ],
                tags: [
                    { name: "Relationship" }
                ]
            },
            {
                sourceIdentifier: "dn-oracle-primary",
                targetIdentifier: "dn-oracle-secondary",
                description: "Replicates data to",
                tags: [
                    { name: "Relationship" }
                ]
            }
        ]
    },
    layout: {
        ["ss-internet-banking"]: { x: 80, y: 80 },
        ["ss-mainframe-banking"]: { x: 40, y: 40 },
        ["con-web-app"]: { x: 40, y: 40 },
        ["con-single-page-app"]: { x: 40, y: 40 },
        ["con-mobile-app"]: { x: 40, y: 40 },
        ["con-api-application"]: { x: 40, y: 40 },
        ["db-database-1"]: { x: 40, y: 40 },
        ["dn-customers-computer"]: { x: 0, y: 40, width: 460, height: 420 },
        ["dn-web-browser"]: { x: 40, y: 40, width: 380, height: 320 },
        ["dn-customers-mobile"]: { x: 40, y: 740, width: 380, height: 320 },
        ["dn-big-bank-plc"]: { x: 800, y: 0, width: 1300, height: 1800 },
        ["dn-bigbank-web"]: { x: 40, y: 40, width: 460, height: 420 },
        ["dn-apache-tomcat-1"]: { x: 40, y: 40, width: 380, height: 320 },
        ["dn-bigbank-api"]: { x: 40, y: 700, width: 460, height: 420 },
        ["dn-apache-tomcat-2"]: { x: 40, y: 40, width: 380, height: 320 },
        ["dn-bigbank-db01"]: { x: 800, y: 40, width: 460, height: 420 },
        ["dn-oracle-primary"]: { x: 40, y: 40, width: 380, height: 320 },
        ["dn-bigbank-db02"]: { x: 800, y: 700, width: 460, height: 420 },
        ["dn-oracle-secondary"]: { x: 40, y: 40, width: 380, height: 320 },
        ["dn-bigbank-prod001"]: { x: 840, y: 1400, width: 380, height: 320 },
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
            ["Deployment Node"]: {
                strokeWidth: 1
            },
            ["External"]: {
                background: "#999999"
            },
            ["Secondary"]: {
                opacity: 25
            }
        },
        relationship: {}
    }
}