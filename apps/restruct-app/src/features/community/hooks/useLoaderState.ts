import { useCallback, useState } from "react";

/**
 * Custom hook for managing loader state.
 * @param initial - Optional initial loader state.
 * @returns An array containing the current loader state, a function to start loading, and a function to stop loading.
 */
export const useLoaderState = (initial?: { isLoading: boolean }): [boolean, () => void, () => void] => {
    const [isLoading, setLoading] = useState(initial?.isLoading ?? false);

    const onStartLoading = useCallback(() => {
        setLoading(true);
    }, []);

    const onStopLoading = useCallback(() => {
        setLoading(false);
    }, []);

    return [isLoading, onStartLoading, onStopLoading];
}