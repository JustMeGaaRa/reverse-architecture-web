import { createContext } from "react";

export const ContextLevelContext = createContext<{ level: number; }>({ level: 0 });