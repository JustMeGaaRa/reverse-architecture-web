import { useContext } from "react";
import { NavigationContext } from "../contexts";

export const useNavigationContext = () => {
    return useContext(NavigationContext)
}