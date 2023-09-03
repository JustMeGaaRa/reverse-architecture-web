import { createContext, ReactNode } from "react";

export const NavigationContext = createContext<{
    components?: ReactNode;
    setComponents: (components?: ReactNode) => void;
}>({
    components: [],
    setComponents: () => {}
});