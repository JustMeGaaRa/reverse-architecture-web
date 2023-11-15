import { createContext } from "react";
import { Account } from "../types";

export const AccountContext = createContext<{
    account?: Account;
    setAccount: (account: Account) => void;
}>({
    setAccount: (account: Account) => {}
});