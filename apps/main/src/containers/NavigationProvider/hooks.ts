import { useContext } from "react";
import { NavigationContext } from "./context";

export const useNavigationContext = () => {
    return useContext(NavigationContext)
}