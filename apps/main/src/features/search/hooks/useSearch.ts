import { useCallback } from "react"
import { SearchStrategy } from "../types";

export const useSearch = () => {
    const onSearch = useCallback((query: string) => {
        const strategy = new SearchStrategy();
        return strategy.search(query);
    }, []);

    return {
        onSearch
    }
}