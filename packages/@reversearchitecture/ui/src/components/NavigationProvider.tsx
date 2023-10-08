import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { NavigationContext } from "../contexts";

export const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ components, setComponents ] = useState<ReactNode>([]);

    return (
        <NavigationContext.Provider
            value={{ components, setComponents }}
        >
            {children}
        </NavigationContext.Provider>
    );
}