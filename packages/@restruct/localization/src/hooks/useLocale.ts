import { useContext } from "react";
import { LocalizationContext } from "../contexts";

export const useLocale = () => {
    return useContext(LocalizationContext);
}