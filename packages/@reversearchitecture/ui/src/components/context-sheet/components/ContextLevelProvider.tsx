import { FC, PropsWithChildren } from "react";
import { ContextLevelContext } from "../contexts";

export const ContextLevelProvider: FC<PropsWithChildren<{
    level?: number
}>> = ({
    children,
    level = 1
}) => {
    return (
        <ContextLevelContext.Provider value={{ level }}>
            {children}
        </ContextLevelContext.Provider>
    )
}