import { createContext } from "react";

export const AccountContext = createContext<{
    account?: any;
    setAccount: (account: any) => void;
}>({
    setAccount: (account: any) => {}
});