import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { NavigationContext } from "./context";
import { useNavigationContext } from "./hooks";

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

export const NavigationSource: FC<PropsWithChildren> = ({ children }) => {
    const { setComponents } = useNavigationContext();

    useEffect(() => {
        setComponents(children);
    }, [children, setComponents])

    return null;
}

export const NavigationTarget: FC = () => {
    const { components } = useNavigationContext();
    return (<>{components}</>);
}