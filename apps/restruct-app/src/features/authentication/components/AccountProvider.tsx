import { FC, PropsWithChildren, useState } from "react";
import { AccountContext } from "../contexts";
import { Account } from "../types";
import { createRandomUser } from "../utils";

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ account, setAccount ] = useState<Account>(createRandomUser());

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    )
}