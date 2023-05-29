import { useContext } from "react";
import { NavigationContext } from "./";

export const useNavigationContext = () => {
    const context = useContext(NavigationContext);
    return { ...context }
}