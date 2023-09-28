import { useCallback, useState } from "react";

export const useOnPressHold = (callback: () => void, delay: number = 500) => {
    const [ timerId, setTimerId ] = useState<NodeJS.Timeout>();

    const onStartHold = useCallback(() => {
        const id = setTimeout(() => callback(), delay);
        setTimerId(id);
    }, [callback, delay]);

    const onCancelHold = useCallback(() => {
        clearTimeout(timerId);
    }, [timerId]);

    return {
        onStartHold,
        onCancelHold,
    }
}