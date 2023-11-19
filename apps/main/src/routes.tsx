import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    CommunityPage,
    DashboardPage,
    ErrorPage,
    LayoutPage,
    WorkspaceListPage,
    ProfileSettingsContent,
    SettingsPage,
    SignInPage,
    WorkspaceContentPage,
    AuthorizePage,
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
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
                path: "workspaces/:workspaceId",
                element: <WorkspaceContentPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "community",
                element: <CommunityPage />,
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
    }
]);