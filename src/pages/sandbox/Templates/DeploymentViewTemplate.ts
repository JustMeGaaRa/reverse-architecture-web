import { View } from "../../../components/c4-view-renderer/store/C4Diagram";

export const deploymentViewTemplate: View = {
    title: "Internet Banking System",
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
        deploymentEnvironments: [
            {
                identifier: "live-env",
                name: "Live",
                deploymentNodes: [
                    {
                        identifier: "dn-customers-computer",
                        name: "Customer's Computer",
                        tags: [
                            { name: "Element" },
                            { name: "Deployment Node" }
                        ],
                        deploymentNodes: [
                            {
                                identifier: "dn-web-browser",
                                name: "Web Browser",
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                containerInstances: [
                                    {
                                        containerIdentifier: "container-2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        identifier: "dn-customers-mobile",
                        name: "Customer's Mobile Device",
                        tags: [
                            { name: "Element" },
                            { name: "Deployment Node" }
                        ],
                        containerInstances: [
                            {
                                containerIdentifier: "container-3"
                            }
                        ]
                    },
                    {
                        identifier: "dn-big-bank-plc",
                        name: "Big Bank plc",
                        tags:[
                            { name: "Element" },
                            { name: "Deployment Node" }
                        ],
                        deploymentNodes: [
                            {
                                identifier: "dn-bigbank-web",
                                name: "bigbank-web***",
                                instances: 4,
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-apache-tomcat-1",
                                        name: "Apache Tomcat",
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "container-1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-api",
                                name: "bigbank-api***",
                                instances: 8,
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-apache-tomcat-2",
                                        name: "Apache Tomcat",
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "container-4"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-db01",
                                name: "bigbank-db01",
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-oracle-primary",
                                        name: "Oracle - Primary",
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "database-1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                identifier: "dn-bigbank-db02",
                                name: "bigbank-db02",
                                tags: [
                                    { name: "Element" },
                                    { name: "Deployment Node" },
                                    { name: "Secondary" }
                                ],
                                deploymentNodes: [
                                    {
                                        identifier: "dn-oracle-secondary",
                                        name: "Web Browser",
                                        tags: [
                                            { name: "Element" },
                                            { name: "Deployment Node" }
                                        ],
                                        containerInstances: [
                                            {
                                                containerIdentifier: "database-1"
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
                                        softwareSystemIdentifier: "software-system-4"
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
        ["software-system-1"]: { x: 80, y: 80 },
        ["software-system-4"]: { x: 40, y: 40 },
        ["container-1"]: { x: 40, y: 40 },
        ["container-2"]: { x: 40, y: 40 },
        ["container-3"]: { x: 40, y: 40 },
        ["container-4"]: { x: 40, y: 40 },
        ["database-1"]: { x: 40, y: 40 },

        ["dn-customers-computer"]: { x: 0, y: 40, width: 400, height: 400 },
        ["dn-web-browser"]: { x: 40, y: 40, width: 320, height: 280 },
        ["dn-customers-mobile"]: { x: 40, y: 740, width: 320, height: 280 },
        ["dn-big-bank-plc"]: { x: 800, y: 0, width: 1240, height: 1760 },
        ["dn-bigbank-web"]: { x: 40, y: 40, width: 400, height: 400 },
        ["dn-apache-tomcat-1"]: { x: 40, y: 40, width: 320, height: 280 },
        ["dn-bigbank-api"]: { x: 40, y: 700, width: 400, height: 400 },
        ["dn-apache-tomcat-2"]: { x: 40, y: 40, width: 320, height: 280 },
        ["dn-bigbank-db01"]: { x: 800, y: 40, width: 400, height: 400 },
        ["dn-oracle-primary"]: { x: 40, y: 40, width: 320, height: 280 },
        ["dn-bigbank-db02"]: { x: 800, y: 700, width: 400, height: 400 },
        ["dn-oracle-secondary"]: { x: 40, y: 40, width: 320, height: 280 },
        ["dn-bigbank-prod001"]: { x: 840, y: 1400, width: 320, height: 280 },
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
            ["Secondary"]: {
                opacity: 25
            }
        },
        relationship: {}
    }
}