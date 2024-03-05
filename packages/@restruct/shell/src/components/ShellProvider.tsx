import { FC, PropsWithChildren } from "react";
import { ShellContext } from "../contexts";

export const ShellProvider: FC<PropsWithChildren<{
    level?: number
}>> = ({
    children,
    level = 1
}) => {
    return (
        <ShellContext.Provider value={{ level }}>
            {children}
        </ShellContext.Provider>
    )
}