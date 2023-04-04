import { createBrowserRouter } from "react-router-dom";
import {
    Layout,
} from "./pages/layout";
import {
    CommunityHub,
    Dashboard,
    ProjectList
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/projects",
                element: <ProjectList />,
            },
            {
                path: "/hub",
                element: <CommunityHub />,
            }
        ]
    }
]);