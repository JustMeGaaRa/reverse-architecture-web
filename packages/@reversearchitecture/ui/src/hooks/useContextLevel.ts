import { useCallback, useContext, useMemo } from "react";
import { ContextLevelContext } from "../contexts";

export const useContextLevel = () => {
    const levels = useMemo(() => (["black", "gray.100", "gray.200", "gray.300"]), []);
    const { level } = useContext(ContextLevelContext);

    const getLevelColor = useCallback((level: number) => levels[level], [levels]);

    return { level, getLevelColor }
}