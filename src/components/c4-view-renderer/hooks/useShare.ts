import { useCallback, useState } from "react";

export const useShare = () => {
    const [link] = useState(window.location.href);

    const clipboardCopy = useCallback((link) => {
        navigator.clipboard.writeText(link);
    }, [])

    return {
        link,
        clipboardCopy
    }
}