import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    CommunityPage,
    DashboardPage,
    ErrorPage,
    Layout,
    WorkspaceListPage,
    ProfileSettingsPage,
    SettingsPage,
    SignInPage,
    WorkspacePage,
    WorkspaceExplorerPage,
    AuthorizePage,
    CommunityTemplatePage,
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
                element: <CommunityPage />,
            },
            {
                path: "community/:workspaceId",
                element: <CommunityTemplatePage />
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
        element: <SignInPage />,
    },
    {
        path: "/authorize",
        element: <AuthorizePage />
    },
    {
        path: "/workspaces/:workspaceId",
        element: <WorkspacePage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <WorkspaceExplorerPage />
            }
        ]
    }
]);