import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    Layout,
    CommunityHub,
    Dashboard,
    ErrorPage,
    ProjectList,
    Settings,
    Workspace,
    ProfileSheet,
    CodeEditorSheet,
    CommentsSheet,
    WorkspaceViewerSheet
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={"projects"} />
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
                        element: <Navigate to={"profile"} />
                    },
                    {
                        path: "profile",
                        element: <ProfileSheet />
                    }
                ]
            }
        ]
    },
    {
        path: "/workspace/:workspaceId",
        element: <Workspace />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <WorkspaceViewerSheet />
            },
            {
                path: "editor",
                element: <CodeEditorSheet />
            },
            {
                path: "comments",
                element: <CommentsSheet />
            }
        ]
    }
]);