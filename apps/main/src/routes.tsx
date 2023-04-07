import { createBrowserRouter } from "react-router-dom";
import {
    Layout,
} from "./pages/layout";
import {
    CommunityHub,
    Dashboard,
    ErrorPage,
    ProjectList,
    Settings,
    Workspace
} from "./pages";
import { ProfileSection } from "./pages/settings/sections/ProfileSection";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "projects",
                element: <ProjectList />
            },
            {
                path: "hub",
                element: <CommunityHub />
            },
            {
                path: "settings",
                element: <Settings />,
                children: [
                    {
                        index: true,
                        element: <ProfileSection />
                    },
                    {
                        path: "profile",
                        element: <ProfileSection />
                    }
                ]
            }
        ]
    },
    {
        path: "/workspace/:workspaceId",
        element: <Workspace />,
        errorElement: <ErrorPage />
    }
]);