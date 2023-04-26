import {
    component,
    componentView,
    container,
    containerInstance,
    containerView,
    deploymentEnvironment,
    deploymentNode,
    deploymentView,
    elementStyle,
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
} from "@structurizr/dsl";

export const BigBankPlc = workspace("Big Bank plc", "",
    model(
        [
            person(
                "pn_banking_customer",
                "Personal Banking Customer",
                "A customer of the bank, with personal bank accounts."
            )
        ],
        [
            softwareSystem(
                "ss_internet_banking",
                "Internet Banking System",
                "Allows customers to view information about their bank accounts, and make payments.",
                [
                    container(
                        "con_web_app",
                        "Web Application",
                        "Delivers the static content and the Internet banking single page application.",
                        technologies("Java", "Spring MVC"),
                    ),
                    container(
                        "con_single_page_app",
                        "Single-Page Application",
                        "Provides all of the Internet banking functionality to customers via their web browser.",
                        technologies("JavaScript", "Angular")
                    ),
                    container(
                        "con_mobile_app",
                        "Mobile App",
                        "Provides limited subset of the Internet banking functionality to the customers via their mobile device.",
                        technologies("Xamarin")
                    ),
                    container(
                        "con_api_application",
                        "API Application",
                        "Provides Internet banking functionality via a JSON/HTTPS API.",
                        technologies("Java", "Spring MVC"),
                        [
                            component(
                                "cmp_signin_ctrl",
                                "Sign-In Controller",
                                "Allows user to sign-in in to the Internat Banking System.",
                                technologies("Spring MVC REST Controller")
                            ),
                            component(
                                "cmp_reset_pwd_ctrl",
                                "Reset Password Controller",
                                "Allows user to reset their password with a single use URL.",
                                technologies("Spring MVC REST Controller")
                            ),
                            component(
                                "cmp_accounts_summary_ctrl",
                                "Accounts Summary Controller",
                                "Provides customers with a summary of their bank accouts.",
                                technologies("Spring MVC REST Controller")
                            ),
                            component(
                                "cmp_security_component",
                                "Security Component",
                                "Provides functionality related to signing in, changing passwords, etc.",
                                technologies("Spring Bean")
                            ),
                            component(
                                "cmp_email_component",
                                "E-mail Component",
                                "Sends e-mails to users.",
                                technologies("Spring Bean")
                            ),
                            component(
                                "cmp_mainframe_facade",
                                "Mainframe Banking System Facade",
                                "A facade onto the mainframe banking system.",
                                technologies("Spring Bean")
                            )
                        ]
                    ),
                    container(
                        "db_database_1",
                        "Database",
                        "Stores user registration information, hashed authentication credential, access logs, etc.",
                        technologies("Oracle Database Schema")
                    )
                ]
            ),
            softwareSystem(
                "ss_mainframe_banking",
                "Mainframe Banking System",
                "Stores all of the core banking information about customers, accounts, transactions, etc.",
                [],
                tags("External")
            ),
            softwareSystem(
                "ss_email_system",
                "E-mail System",
                "The internal Microsoft Exchange e-mail system.",
                [],
                tags("External")
            )
        ],
        [
            deploymentEnvironment(
                "live_env",
                "Live",
                [
                    deploymentNode(
                        "dn_customers_computer",
                        "Customer's Computer",
                        undefined,
                        technologies("Microsoft Windows or Apple macOS"),
                        undefined,
                        undefined,
                        [
                            deploymentNode(
                                "dn_web_browser",
                                "Web Browser",
                                undefined,
                                technologies("Chrome, Firefox, Safari, or Edge"),
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                [ containerInstance("con_single_page_app", "con_single_page_app_inst_1") ]
                            )
                        ]
                    ),
                    deploymentNode(
                        "dn_customers_mobile",
                        "Customer's Mobile Device",
                        undefined,
                        technologies("Apple iOS or Android"),
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        [ containerInstance("con_mobile_app", "con_mobile_app_inst_1") ]
                    ),
                    deploymentNode(
                        "dn_big_bank_plc",
                        "Big Bank plc",
                        undefined,
                        technologies("Big Bank plc data center"),
                        undefined,
                        undefined,
                        [
                            deploymentNode(
                                "dn_bigbank_web",
                                "bigbank-web***",
                                undefined,
                                technologies("Ubuntu 16.04 LTS"),
                                4,
                                undefined,
                                [
                                    deploymentNode(
                                        "dn_apache_tomcat_1",
                                        "Apache Tomcat",
                                        undefined,
                                        technologies("Apache Tomcat 8.x"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("con_web_app", "con_web_app_inst_1") ]
                                    )
                                ],
                            ),
                            deploymentNode(
                                "dn_bigbank_api",
                                "bigbank-api***",
                                undefined,
                                technologies("Ubuntu 16.04.LTS"),
                                8,
                                undefined,
                                [
                                    deploymentNode(
                                        "dn_apache_tomcat_2",
                                        "Apache Tomcat",
                                        undefined,
                                        technologies("Apache Tomcat 8.x"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("con_api_application", "con_api_application_inst_1") ]
                                    )
                                ]
                            ),
                            deploymentNode(
                                "dn_bigbank_db01",
                                "bigbank-db01",
                                undefined,
                                technologies("Ubuntu 16.04 LTS"),
                                undefined,
                                undefined,
                                [
                                    deploymentNode(
                                        "dn_oracle_primary",
                                        "Oracle - Primary",
                                        undefined,
                                        technologies("Oracle 12c"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("db_database_1", "db_database_1_inst_1") ]
                                    )
                                ]
                            ),
                            deploymentNode(
                                "dn_bigbank_db02",
                                "bigbank-db02",
                                undefined,
                                technologies("Ubuntu 16.04 LTS"),
                                undefined,
                                tags("Secondary"),
                                [
                                    deploymentNode(
                                        "dn_oracle_secondary",
                                        "Oracle - Secondary",
                                        undefined,
                                        technologies("Oracle 12c"),
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        [ containerInstance("db_database_1", "db_database_1_inst_2") ]
                                    )
                                ]
                            ),
                            deploymentNode(
                                "dn_bigbank_prod001",
                                "bigbank-prod001",
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                [ softwareSystemInstance("ss_mainframe_banking", "ss_mainframe_banking_inst_1") ]
                            )
                        ]
                    )
                ]
            )
        ],
        [
            // System Context Relationships
            relationship(
                "pn_banking_customer",
                "ss_internet_banking",
                "Views account balances, and makes payments using",
            ),
            relationship(
                "ss_email_system",
                "pn_banking_customer",
                "Sends e-mails to",
            ),
            relationship(
                "ss_internet_banking",
                "ss_email_system",
                "Sends e-mails using",
            ),
            relationship(
                "ss_internet_banking",
                "ss_mainframe_banking",
                "Gets account information from, and makes payments using",
            ),
            // Container Relationships
            relationship(
                "pn_banking_customer",
                "con_web_app",
                "Visits bigbank.com/id using",
                technologies("HTTPS")
            ),
            relationship(
                "pn_banking_customer",
                "con_single_page_app",
                "Views account balances, and makes payments using",
            ),
            relationship(
                "pn_banking_customer",
                "con_mobile_app",
                "Views account balances, and makes payments using",
            ),
            relationship(
                "con_web_app",
                "con_single_page_app",
                "Delivers to the customer's web browser",
            ),
            relationship(
                "con_single_page_app",
                "con_api_application",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_mobile_app",
                "con_api_application",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_api_application",
                "db_database_1",
                "Reads from and writes to",
                technologies("JDBC")
            ),
            relationship(
                "con_api_application",
                "ss_email_system",
                "Sends e-mails using",
            ),
            relationship(
                "con_api_application",
                "ss_mainframe_banking",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            // Component Relationships
            relationship(
                "con_single_page_app",
                "cmp_signin_ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_single_page_app",
                "cmp_reset_pwd_ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_single_page_app",
                "cmp_accounts_summary_ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_mobile_app",
                "cmp_signin_ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_mobile_app",
                "cmp_reset_pwd_ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "con_mobile_app",
                "cmp_accounts_summary_ctrl",
                "Makes API calls to",
                technologies("JSON", "HTTPS")
            ),
            relationship(
                "cmp_signin_ctrl",
                "cmp_security_component",
                "Uses",
            ),
            relationship(
                "cmp_reset_pwd_ctrl",
                "cmp_security_component",
                "Uses",
            ),
            relationship(
                "cmp_reset_pwd_ctrl",
                "cmp_email_component",
                "Uses",
            ),
            relationship(
                "cmp_accounts_summary_ctrl",
                "cmp_mainframe_facade",
                "Uses",
            ),
            relationship(
                "cmp_security_component",
                "db_database_1",
                "Reads from and writes to",
                technologies("JDBC"),
            ),
            relationship(
                "cmp_email_component",
                "ss_email_system",
                "Sends e_mails using",
            ),
            relationship(
                "cmp_mainframe_facade",
                "ss_mainframe_banking",
                "Makes API calls to",
                technologies("XML", "HTTPS")
            ),
            relationship(
                "dn_oracle_primary",
                "dn_oracle_secondary",
                "Replicates data to",
            )
        ]
    ),
    views(
        [
            systemContextView(
                "ss_internet_banking",
                "Template",
                "Internet Banking System",
                {
                    ["pn_banking_customer"]: { x: 0, y: 0 },
                    ["ss_internet_banking"]: { x: 0, y: 400 },
                    ["ss_email_system"]: { x: 480, y: 400 },
                    ["ss_mainframe_banking"]: { x: 0, y: 800 }
                }
            )
        ],
        [
            containerView(
                "ss_internet_banking",
                "Template",
                "Internet Banking System",
                {
                    ["pn_banking_customer"]: { x: 800, y: 0 },
                    ["ss_internet_banking"]: { x: 0, y: 380, width: 1320, height: 720 },
                    ["ss_email_system"]: { x: 1500, y: 420 },
                    ["ss_mainframe_banking"]: { x: 1500, y: 820 },
                    ["con_web_app"]: { x: 40, y: 40 },
                    ["con_single_page_app"]: { x: 640, y: 40 },
                    ["con_mobile_app"]: { x: 980, y: 40 },
                    ["con_api_application"]: { x: 800, y: 440 },
                    ["db_database_1"]: { x: 40, y: 440 },
                }
            )
        ],
        [
            componentView(
                "con_api_application",
                "Template",
                "Internet Banking System _ API Application",
                {
                    ["ss_internet_banking"]: { x: 0, y: 0, width: 1660, height: 1380 },
                    ["ss_email_system"]: { x: 680, y: 1100 },
                    ["ss_mainframe_banking"]: { x: 1280, y: 1100 },
                    ["con_single_page_app"]: { x: 380, y: 40 },
                    ["con_mobile_app"]: { x: 980, y: 40 },
                    ["con_api_application"]: { x: 40, y: 380, width: 1580, height: 600 },
                    ["db_database_1"]: { x: 80, y: 1100 },
                    ["cmp_signin_ctrl"]: { x: 40, y: 40 },
                    ["cmp_reset_pwd_ctrl"]: { x: 640, y: 40 },
                    ["cmp_accounts_summary_ctrl"]: { x: 1240, y: 40 },
                    ["cmp_security_component"]: { x: 40, y: 320 },
                    ["cmp_email_component"]: { x: 640, y: 320 },
                    ["cmp_mainframe_facade"]: { x: 1240, y: 320 },
                }
            )
        ],
        [
            deploymentView(
                "ss_internet_banking",
                "Live",
                "Template",
                "Internet Banking System _ Live",
                {
                    ["ss_internet_banking"]: { x: 80, y: 80 },
                    ["ss_mainframe_banking_inst_1"]: { x: 40, y: 40 },
                    ["con_web_app_inst_1"]: { x: 40, y: 40 },
                    ["con_single_page_app_inst_1"]: { x: 40, y: 40 },
                    ["con_mobile_app_inst_1"]: { x: 40, y: 40 },
                    ["con_api_application_inst_1"]: { x: 40, y: 40 },
                    ["db_database_1_inst_1"]: { x: 40, y: 40 },
                    ["db_database_1_inst_2"]: { x: 40, y: 40 },
                    ["dn_customers_computer"]: { x: 0, y: 40, width: 460, height: 420 },
                    ["dn_web_browser"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn_customers_mobile"]: { x: 40, y: 740, width: 380, height: 320 },
                    ["dn_big_bank_plc"]: { x: 800, y: 0, width: 1300, height: 1800 },
                    ["dn_bigbank_web"]: { x: 40, y: 40, width: 460, height: 420 },
                    ["dn_apache_tomcat_1"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn_bigbank_api"]: { x: 40, y: 700, width: 460, height: 420 },
                    ["dn_apache_tomcat_2"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn_bigbank_db02"]: { x: 800, y: 40, width: 460, height: 420 },
                    ["dn_oracle_primary"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn_bigbank_db01"]: { x: 800, y: 700, width: 460, height: 420 },
                    ["dn_oracle_secondary"]: { x: 40, y: 40, width: 380, height: 320 },
                    ["dn_bigbank_prod001"]: { x: 840, y: 1400, width: 380, height: 320 },
                }
            )
        ],
        styles([
            elementStyle("Person", {
                background: "#38A169",
                color: "#ffffff",
                strokeWidth: 0
            }),
            elementStyle("Software System", {
                background: "#6B46C1",
                color: "#ffffff",
                strokeWidth: 0
            }),
            elementStyle("Container", {
                background: "#3182ce",
                color: "#ffffff",
                strokeWidth: 0
            }),
            elementStyle("Component", {
                background: "#90cdf4",
                color: "#000000",
                strokeWidth: 0
            }),
            elementStyle("Deployment Node", {
                color: "#000000",
                strokeWidth: 2,
            }),
            elementStyle("External", {
                background: "#999999",
                strokeWidth: 0
            }),
            elementStyle("Secondary", {
                opacity: 25
            })
        ])
    )
)