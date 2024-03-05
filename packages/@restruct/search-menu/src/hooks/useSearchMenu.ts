import { useContext } from "react";
import { SearchMenuContext } from "../contexts";

export const useSearchMenu = () => {
    return useContext(SearchMenuContext);
}