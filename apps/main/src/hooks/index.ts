import { useCallback, useState } from "react";

export const useLoaderState = (initial?: { isLoading: boolean }) => {
    const [loading, setLoading] = useState(initial?.isLoading ?? false);

    const onStartLoading = useCallback(() => {
        setLoading(true);
    }, []);

    const onStopLoading = useCallback(() => {
        setLoading(false);
    }, []);

    return {
        isLoading: loading,
        onStartLoading,
        onStopLoading
    }
}