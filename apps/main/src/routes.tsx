import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    CommunityExplorerPage,
    DashboardPage,
    LayoutPage,
    ProfileSettingsContent,
    SettingsPage,
    SignInPage,
    AuthorizePage,
    WorkspacePage,
    WorkspaceSharedPage,
    WorkspaceExplorerPage,
} from "./pages";
import { TestWorkspacePage } from "./pages/test-page";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
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
                element: <WorkspaceExplorerPage />
            },
            {
                path: "workspaces/:workspaceId",
                element: <WorkspacePage />,
            },
            {
                path: "shared",
                element: <WorkspaceSharedPage />,
            },
            {
                path: "community",
                element: <CommunityExplorerPage />,
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
                        element: <ProfileSettingsContent />
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
        path: "/test",
        element: <TestWorkspacePage />
    }
]);