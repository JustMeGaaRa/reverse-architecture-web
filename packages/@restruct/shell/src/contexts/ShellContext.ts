import { createContext } from "react";

export const ShellContext = createContext<{ level: number; }>({ level: 0 });