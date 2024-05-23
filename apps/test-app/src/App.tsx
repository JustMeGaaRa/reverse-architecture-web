import {
    ComponentView,
    Component,
    Container,
    ContainerView,
    DeploymentNode,
    DeploymentView,
    IContainer,
    IDeploymentNode,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    IViewMetadata,
    Person,
    Relationship,
    SoftwareSystem,
    SystemLandscapeView,
    Views,
    Workspace,
    IComponent,
} from "@structurizr/svg";

export function App() {
    const customer: IPerson = {
        type: "Person",
        identifier: "customer",
        name: "Personal Banking Customer",
        description: "A customer of the bank, with personal bank accounts.",
    };
    const softwareSystem: ISoftwareSystem = {
        type: "Software System",
        identifier: "internetBankingSystem",
        name: "Internet Banking System",
        description: "Provides a limited subset of the Internet banking functionality to customers via their mobile devices. Provides a limit.",
        technology: ".NET",
    };
    const relationship: IRelationship = {
        identifier: "customer_internetBankingSystem",
        sourceIdentifier: "customer",
        targetIdentifier: "internetBankingSystem",
        description: "Views account balances, and makes payments using",
    };
    const spa: IContainer = {
        type: "Container",
        identifier: "singlePageApplication",
        name: "Single-Page Application",
        description: "Provides all of the Internet banking functionality to customers via their web browser.",
        technology: "JavaScript and Angular",
    };
    const web: IContainer = {
        type: "Container",
        identifier: "webApplication",
        name: "Web Application",
        description: "Delivers the static content and the Internet banking single page application.",
        technology: "Java and Spring MVC",
    };
    const api: IContainer = {
        type: "Container",
        identifier: "apiApplication",
        name: "API Application",
        description: "Provides Internet banking functionality via a JSON/HTTPS API.",
        technology: "Java and Spring MVC",
    };
    const account: IComponent = {
        type: "Component",
        identifier: "accountsSummaryController",
        name: "Accounts Summary Controller",
        description: "Provides customers with a summary of their bank accounts.",
        technology: "Spring MVC Rest Controller",
    };
    const devLaptop: IDeploymentNode = {
        type: "Deployment Node",
        identifier: "devLaptop",
        name: "Developer Laptop",
    };
    const webBrowser: IDeploymentNode = {
        type: "Deployment Node",
        identifier: "webBrowser",
        name: "Web Browser",
    };
    const webServer: IDeploymentNode = {
        type: "Deployment Node",
        identifier: "webServer",
        name: "Docker Container - Web Server",
    };
    const apache: IDeploymentNode = {
        type: "Deployment Node",
        identifier: "apache",
        name: "Apache Tomcat",
    };

    const systemLandscapeViewMetadata: IViewMetadata = {
        elements: {
            ["customer"]: { x: 100, y: -250 },
            ["internetBankingSystem"]: { x: 600, y: -350 },
        },
        relationships: {
            ["customer_internetBankingSystem"]: [],
        },
    };
    const containerViewMetadata: IViewMetadata = {
        elements: {
            ["internetBankingSystem"]: { x: 100, y: 40, height: 500, width: 600 },
            ["singlePageApplication"]: { x: 50, y: 100 },
            ["webApplication"]: { x: 350, y: 50 },
        },
        relationships: {},
    };
    const componentViewMetadata: IViewMetadata = {
        elements: {
            ["apiApplication"]: { x: 900, y: 150, height: 350, width: 400 },
            ["accountsSummaryController"]: { x: 100, y: 50 },
        },
        relationships: {},
    };
    const deploymentViewMetadata: IViewMetadata = {
        elements: {
            ["devLaptop"]: { x: -1100, y: -100, height: 800, width: 1000 },
            ["webBrowser"]: { x: 50, y: 200, height: 350, width: 300 },
            ["webServer"]: { x: 450, y: 50, height: 650, width: 500 },
            ["apache"]: { x: 50, y: 50, height: 350, width: 300 },
            ["apiApplication"]: { x: 50, y: 50 },
            ["webApplication"]: { x: 50, y: 50 },
        },
        relationships: {},
    };

    return (
        <div
            style={{
                margin: "0px",
                padding: "0px",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Workspace>
                <Views>
                    <SystemLandscapeView
                        value={{ key: "system landscape" }}
                        metadata={systemLandscapeViewMetadata}
                    >
                        <Person value={customer}></Person>
                        <SoftwareSystem value={softwareSystem}></SoftwareSystem>
                        <Relationship value={relationship}></Relationship>
                    </SystemLandscapeView>

                    <ContainerView
                        value={{ key: "container" }}
                        metadata={containerViewMetadata}
                    >
                        <SoftwareSystem value={softwareSystem}>
                            <Container value={spa} />
                            <Container value={web} />
                        </SoftwareSystem>
                    </ContainerView>

                    <ComponentView
                        value={{ key: "component" }}
                        metadata={componentViewMetadata}
                    >
                        <Container value={api}>
                            <Component value={account}></Component>
                        </Container>
                    </ComponentView>

                    <DeploymentView
                        value={{ key: "deployment", environment: "Development" }}
                        metadata={deploymentViewMetadata}
                    >
                        <DeploymentNode value={devLaptop}>
                            <DeploymentNode value={webBrowser}>
                                <Container value={api}></Container>
                            </DeploymentNode>
                            <DeploymentNode value={webServer}>
                                <DeploymentNode value={apache}>
                                    <Container value={web}></Container>
                                </DeploymentNode>
                            </DeploymentNode>
                        </DeploymentNode>
                        {/* <Relationship
                        value={{
                            identifier: "1",
                            sourceIdentifier: "apiApplication",
                            targetIdentifier: "webApplication",
                        }}
                        ></Relationship> */}
                    </DeploymentView>
                </Views>
            </Workspace>
        </div>
    );
}