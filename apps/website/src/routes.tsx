import { createBrowserRouter } from "react-router-dom";
import { Home, Sandbox } from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "sandbox/:workspaceId",
        element: <Sandbox />
    }
]);