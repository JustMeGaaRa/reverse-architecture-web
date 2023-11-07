import { FC, PropsWithChildren, useState } from "react";
import { AccountContext } from "../contexts";
import { createDefaultUser } from "../utils";

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ account, setAccount ] = useState(createDefaultUser());

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    )
}