import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    CommunityPage,
    DashboardPage,
    ErrorPage,
    HomeLayoutPage,
    WorkspaceListPage,
    ProfileSettingsPage,
    SettingsPage,
    SignInPage,
    WorkspaceLayoutPage,
    WorkspaceContentPage,
    AuthorizePage,
    CommunityTemplatePage,
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayoutPage />,
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
        element: <WorkspaceLayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <WorkspaceContentPage />
            }
        ]
    }
]);