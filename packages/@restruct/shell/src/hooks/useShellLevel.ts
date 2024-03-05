import { useCallback, useContext, useMemo } from "react";
import { ShellContext } from "../contexts";

export const useShellLevel = () => {
    const levels = useMemo(() => (["black", "gray.100", "gray.200", "gray.300"]), []);
    const { level } = useContext(ShellContext);

    const getLevelColor = useCallback((level: number) => levels[level], [levels]);

    return { level, getLevelColor }
}