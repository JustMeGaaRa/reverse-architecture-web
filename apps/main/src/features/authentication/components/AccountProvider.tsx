import { FC, PropsWithChildren, useState } from "react";
import { AccountContext } from "../contexts";
import { Account } from "../types";
import { createDefaultUser } from "../utils";

// TODO: define the type of the account
export const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ account, setAccount ] = useState<Account>(createDefaultUser());

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    )
}