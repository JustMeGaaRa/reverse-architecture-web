import { useCallback, useState } from "react";

export const useOnPressHold = () => {
    const [ timerId, setTimerId ] = useState<NodeJS.Timeout>();

    const onStartHold = useCallback((callback: () => void, delay: number = 500) => {
        setTimerId(setTimeout(() => callback(), delay));
    }, []);

    const onCancelHold = useCallback(() => {
        clearTimeout(timerId);
    }, [timerId]);

    return {
        onStartHold,
        onCancelHold,
    }
}