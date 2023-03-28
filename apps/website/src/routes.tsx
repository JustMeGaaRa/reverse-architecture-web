import { createBrowserRouter } from "react-router-dom";
import {
    About,
    DocsPage,
    Home,
    Sandbox
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "sandbox/:workspaceId",
        element: <Sandbox />
    },
    {
        path: "docs",
        element: <DocsPage />
    },
    {
        path: "about",
        element: <About />
    }
]);