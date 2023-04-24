import { WorkspaceLayout } from "@justmegaara/structurizr-dsl";

export const BigBankPlcLayout: WorkspaceLayout = {
    views: [
        {
            type: "System Context",
            identifier: "ss_internet_banking",
            elements: {
                ["pn_banking_customer"]: { x: 0, y: 0 },
                ["ss_internet_banking"]: { x: 0, y: 400 },
                ["ss_email_system"]: { x: 480, y: 400 },
                ["ss_mainframe_banking"]: { x: 0, y: 800 }
            }
        },
        {
            type: "Container",
            identifier: "ss_internet_banking",
            elements: {
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
        },
        {
            type: "Component",
            identifier: "con_api_application",
            elements: {
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
            },
        },
        {
            type: "Deployment",
            identifier: "ss_internet_banking",
            elements: {
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
        }
    ]
}