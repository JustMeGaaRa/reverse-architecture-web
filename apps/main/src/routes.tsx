import { createBrowserRouter } from "react-router-dom";
import {
    Layout,
} from "./pages/layout";
import {
    CommunityHub,
    Dashboard,
    ErrorPage,
    ProjectList,
    Workspace
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/projects",
                element: <ProjectList />
            },
            {
                path: "/hub",
                element: <CommunityHub />
            }
        ]
    },
    {
        path: "/workspace/:workspaceId",
        element: <Workspace />,
        errorElement: <ErrorPage />
    }
]);