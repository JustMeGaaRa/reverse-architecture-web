import { createContext } from "react";

export const AccountContext = createContext<{
    account?: {
        username: string;
        fullname: string;
        email: string;
        avatar: string;
    };
}>({});

export const AccountProvider = AccountContext.Provider;

export * from "./hooks";