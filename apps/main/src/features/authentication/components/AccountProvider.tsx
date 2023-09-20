import { FC, PropsWithChildren, useState } from "react";
import { AccountContext } from "../contexts";
import { createRandomUser } from "../utils";

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ account, setAccount ] = useState(createRandomUser());

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    )
}