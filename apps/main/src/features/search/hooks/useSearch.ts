import { useCallback } from "react"
import { SearchStrategy } from "../types";

export const useSearch = () => {
    const search = useCallback((query: string) => {
        const strategy = new SearchStrategy();
        return strategy.search(query);
    }, []);

    return {
        search
    }
}