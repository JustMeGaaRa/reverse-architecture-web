import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    AuthenticatePage,
    CommunityHubPage,
    DashboardPage,
    ErrorPage,
    Layout,
    WorkspaceListPage,
    ProfileSettingsPage,
    SettingsPage,
    WorkspacePage,
    WorkspaceDiagrammingPage,
    WorkspaceModelingPage,
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={"community"} />
            },
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "workspaces",
                element: <WorkspaceListPage />
            },
            {
                path: "community",
                element: <CommunityHubPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={"profile"} />
                    },
                    {
                        path: "profile",
                        element: <ProfileSettingsPage />
                    }
                ]
            }
        ]
    },
    {
        path: "/signin",
        element: <AuthenticatePage />,
    },
    {
        path: "/workspaces/:workspaceId",
        element: <WorkspacePage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={"diagramming"} />
            },
            {
                path: "diagramming",
                element: <WorkspaceDiagrammingPage />
            },
            {
                path: "modeling",
                element: <WorkspaceModelingPage />
            }
        ]
    }
]);