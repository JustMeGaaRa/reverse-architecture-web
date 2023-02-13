import {
    component,
    componentView,
    container,
    containerInstance,
    containerView,
    deploymentEnvironment,
    deploymentNode,
    deploymentView,
    model,
    person,
    relationship,
    softwareSystem,
    softwareSystemInstance,
    styles,
    systemContextView,
    tags,
    technologies,
    views,
    workspace
} from "../../../dsl";
import { element } from "../../../dsl/view/ElementStyle";

export const workspaceTemplate = workspace("Big Bank plc", "",
    model(
        [
            person(
                "pn-banking-customer",
                "Personal Banking Customer",
                "A customer of the bank, with personal bank accounts."
            )
        ],
        [
            softwareSystem(
                "ss-internet-banking",
                "Internet Banking System",
                "Allows customers to view information about their bank accounts, and make payments.",
                [
                    container(
                        "con-web-app",
                        "Web Application",
                        "Delivers the static content and the Internet banking single page application.",
                        technologies("Java", "Spring MVC"),
                    ),
                    container(
                        "con-single-page-app",
                        "Single-Page Application",
                        "Provides all of the Internet banking functionality to customers via their web browser.",
                        technologies("JavaScript", "Angular")
                    ),
                    container(
                        "con-mobile-app",
                        "Mobile App",
                        "Provides limited subset of the Internet banking functionality to the customers via their mobile device.",
                        technologies("Xamarin")
                    ),
                    container(
                        "con-api-application",
                        "API Application",
                        "Provides Internet banking functionality via a JSON/HTTPS API.",
                        technologies("Java", "Spring MVC"),
                        [
                            component(
                                "cmp-signin-ctrl",
                                "Sign-In Controller",
                                "Allows user to sign-in in to the Internat Banking System.",
                                technologies("Spring MVC REST Controller")
                            ),
                            component(
                                "cmp-reset-pwd-ctrl",
                                "Reset Password Controller",
                                "Allows user to reset their password with a single use URL.",
                                technologies("Spring MVC REST Controller")
                            ),
                            component(
                                "cmp-accounts-summary-ctrl",
                                "Accounts Summary Controller",
                                "Provides customers with a summary of their bank accouts.",
                                technologies("Spring MVC REST Controller")
                            ),
                            component(
                                "cmp-security-component",
                                "Security Component",
                                "Provides functionality related to signing in, changing passwords, etc.",
                                technologies("Spring Bean")
                            ),
                            component(
                                "cmp-email-component",
                                "E-mail Component",
                                "Sends e-mails to users.",
                                technologies("Spring Bean")
                            ),
                            component(
                                "cmp-mainframe-facade",
                                "Mainframe Banking System Facade",
                                "A facade onto the mainframe banking system.",
                                technologies("Spring Bean")
                            )
                        ]
                    ),
                    container(
                        "db-database-1",
                        "Database",
                        "Stores user registration information, hashed authentication credential, access logs, etc.",
                        technologies("Oracle Database Schema")
                    )
                ]
            ),
            softwareSystem(
                "ss-mainframe-banking",
                "Mainframe Banking System",
                "Stores all of the core banking information about customers, accounts, transactions, etc.",
                [],
                tags("External")
            ),
            softwareSystem(
                "ss-email-system",
                "E-mail System",
                "The internal Microsoft Exchange e-mail system.",
                [],
                tags("External")
            )
        ],
        [
            deploymentEnvironment(
                "live-env",
                "Live",
                [
                    deploymentNode(
                        "dn-customers-computer",
                        "Customer's Computer",
                        undefined,
                        technologies("Microsoft Windows or Apple macOS"),
                        undefined,
                        undefined,
                        [
                            deploymentNode(
                                "dn-web-browser",
                                "Web Browser",
                                undefined,
                                technologies("Chrome, Firefox, Safari, or Edge"),
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                [ containerInstance("con-single-page-app") ]
                            )
                        ]
                    ),
                    deploymentNode(
                        "dn-customers-mobile",
                        "Customer's Mobile Device",
                        undefined,
                        technologies("Apple iOS or Android"),
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        [ containerInstance("con-mobile-app") ]
                    ),
                    deploymentNode(
                        "dn-big-bank-plc",
                        "Big Bank plc",
                        undefined,
                        technologies("Big Bank plc data center"),
                        undefined,
                        undefined,
                        [
                            deploymentNode(
                                "dn-bigbank-web",
                                "bigbank-web***",
                                undefined,
                                technologies("Ubuntu 16.04 LTS"),
                                4,
                                undefined,
                                [
                                    deploymentNode(
                                        "dn-apache-tomcat-1",
                                        "Apache Tomcat",
                                        undefined,
                                        technologies("Apache Tomcat 8.x"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("con-web-app") ]
                                    )
                                ],
                            ),
                            deploymentNode(
                                "dn-bigbank-api",
                                "bigbank-api***",
                                undefined,
                                technologies("Ubuntu 16.04.LTS"),
                                8,
                                undefined,
                                [
                                    deploymentNode(
                                        "dn-apache-tomcat-2",
                                        "Apache Tomcat",
                                        undefined,
                                        technologies("Apache Tomcat 8.x"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("con-api-application") ]
                                    )
                                ]
                            ),
                            deploymentNode(
                                "dn-bigbank-db01",
                                "bigbank-db01",
                                undefined,
                                technologies("Ubuntu 16.04 LTS"),
                                undefined,
                                undefined,
                                [
                                    deploymentNode(
                                        "dn-oracle-primary",
                                        "Oracle - Primary",
                                        undefined,
                                        technologies("Oracle 12c"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("db-database-1") ]
                                    )
                                ]
                            ),
                            deploymentNode(
                                "dn-bigbank-db02",
                                "bigbank-db02",
                                undefined,
                                technologies("Ubuntu 16.04 LTS"),
                                undefined,
                                tags("Secondary"),
                                [
                                    deploymentNode(
                                        "dn-oracle-secondary",
                                        "Oracle - Secondary",
                                        undefined,
                                        technologies("Oracle 12c"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("db-database-1") ]
                                    )
                                ]
                            ),
                            deploymentNode(
                                "dn-bigbank-prod001",
                                "bigbank-prod001",
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                [ softwareSystemInstance("ss-mainframe-banking") ]
                            )
                        ]
                    )
                ]
            )
        ],
        [
            // System Context Relationships
            relationship(
                "pn-banking-customer",
                "ss-internet-banking",
                "Views account balances, and makes payments using",
            ),
            relationship(
                "ss-email-system",
                "pn-banking-customer",
                "Sends e-mails to",
            ),
            relationship(
                "ss-internet-banking",
                "ss-email-system",
                "Sends e-mails using",
            ),
            relationship(
                "ss-internet-banking",
                "ss-mainframe-banking",
                "Gets account information from, and makes payments using",
            ),
            // Container Relationships
            relationship(
                "pn-banking-customer",
                "con-web-app",
                "Visits bigbank.com/id using",
                technologies("HTTPS")
            ),
            relationship(
                "pn-banking-customer",
                "con-single-page-app",
                "Views account balances, and makes payments using",
            ),
            relationship(
                "pn-banking-customer",
                "con-mobile-app",
                "Views account balances, and makes payments using",
            ),
            relationship(
                "con-web-app",
                "con-single-page-app",
                "Delivers to the customer's web browser",
            ),
            relationship(
                "con-single-page-app",
                "con-api-application",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-mobile-app",
                "con-api-application",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-api-application",
                "db-database-1",
                "Reads from and writes to",
                technologies("JDBC")
            ),
            relationship(
                "con-api-application",
                "ss-email-system",
                "Sends e-mails using",
            ),
            relationship(
                "con-api-application",
                "ss-mainframe-banking",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            // Component Relationships
            relationship(
                "con-single-page-app",
                "cmp-signin-ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-single-page-app",
                "cmp-reset-pwd-ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-single-page-app",
                "cmp-accounts-summary-ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-mobile-app",
                "cmp-signin-ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-mobile-app",
                "cmp-reset-pwd-ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con-mobile-app",
                "cmp-accounts-summary-ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "cmp-signin-ctrl",
                "cmp-security-component",
                "Uses",
            ),
            relationship(
                "cmp-reset-pwd-ctrl",
                "cmp-security-component",
                "Uses",
            ),
            relationship(
                "cmp-reset-pwd-ctrl",
                "cmp-email-component",
                "Uses",
            ),
            relationship(
                "cmp-accounts-summary-ctrl",
                "cmp-mainframe-facade",
                "Uses",
            ),
            relationship(
                "cmp-security-component",
                "db-database-1",
                "Reads from and writes to",
                technologies("JDBC"),
            ),
            relationship(
                "cmp-email-component",
                "ss-email-system",
                "Sends e-mails using",
            ),
            relationship(
                "cmp-mainframe-facade",
                "ss-mainframe-banking",
                "Makes API calls to",
                technologies("XML", "HTTPS")
            ),
            relationship(
                "dn-oracle-primary",
                "dn-oracle-secondary",
                "Replicates data to",
            )
        ]
    ),
    views(
        [
            systemContextView(
                "ss-internet-banking",
                "Template",
                "Internet Banking System",
                {
                    ["pn-banking-customer"]: { x: 0, y: 0 },
                    ["ss-internet-banking"]: { x: 0, y: 400 },
                    ["ss-email-system"]: { x: 480, y: 400 },
                    ["ss-mainframe-banking"]: { x: 0, y: 800 }
                }
            )
        ],
        [
            containerView(
                "ss-internet-banking",
                "Template",
                "Internet Banking System",
                {
                    ["pn-banking-customer"]: { x: 800, y: 0 },
                    ["ss-internet-banking"]: { x: 0, y: 380, width: 1320, height: 720 },
                    ["ss-email-system"]: { x: 1500, y: 420 },
                    ["ss-mainframe-banking"]: { x: 1500, y: 820 },
                    ["con-web-app"]: { x: 40, y: 40 },
                    ["con-single-page-app"]: { x: 640, y: 40 },
                    ["con-mobile-app"]: { x: 980, y: 40 },
                    ["con-api-application"]: { x: 800, y: 440 },
                    ["db-database-1"]: { x: 40, y: 440 },
                }
            )
        ],
        [
            componentView(
                "con-api-application",
                "Template",
                "Internet Banking System - API Application",
                {
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
                }
            )
        ],
        [
            deploymentView(
                "ss-internet-banking",
                "Live",
                "Template",
                "Internet Banking System",
                {
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
                    ["dn-bigbank-db02"]: { x: 800, y: 40, width: 460, height: 420 },
                    ["dn-oracle-primary"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn-bigbank-db01"]: { x: 800, y: 700, width: 460, height: 420 },
                    ["dn-oracle-secondary"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn-bigbank-prod001"]: { x: 840, y: 1400, width: 380, height: 320 },
                }
            )
        ],
        styles([
            element("Person", {
                background: "#38A169"
            }),
            element("Software System", {
                background: "#6B46C1"
            }),
            element("Container", {
                background: "#3182ce"
            }),
            element("Component", {
                background: "#90cdf4"
            }),
            element("Deployment Node", {
                strokeWidth: 2
            }),
            element("External", {
                background: "#999999"
            }),
            element("Secondary", {
                opacity: 25
            })
        ])
    )
)