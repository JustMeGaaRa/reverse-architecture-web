import {
    createBrowserRouter,
} from "react-router-dom";
import {
    Layout
} from "./pages";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    }
]);