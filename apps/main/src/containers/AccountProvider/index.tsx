import { createContext } from "react";
import { User } from "../../hooks";

export const AccountContext = createContext<{
    account?: User;
}>({});

export const AccountProvider = AccountContext.Provider;

export * from "./hooks";