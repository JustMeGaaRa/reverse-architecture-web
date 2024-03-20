import { useContext } from "react";
import { ViewStrategyContext } from "../contexts";

export const useViewStrategy = () => {
    return useContext(ViewStrategyContext);
}