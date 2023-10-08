import { useCallback, useEffect } from "react";
import { Awareness } from "y-protocols/awareness";

export const useAwarenessEffect = (
    awareness: Awareness,
    handlers: {
        onChange: (awareness: any) => void;
        onUpdate: (awareness: any) => void;
    }
) => {
    const onChange = useCallback(() => {
        handlers.onChange?.(awareness);
    }, [handlers, awareness]);

    const onUpdate = useCallback(() => {
        handlers.onUpdate?.(awareness);
    }, [handlers, awareness]);

    useEffect(() => {
        awareness?.on("change", onChange);
        awareness?.on("update", onUpdate);

        return () => {
            awareness?.off("change", onChange);
            awareness?.off("update", onUpdate);
        }
    }, [awareness, onChange, onUpdate]);
}