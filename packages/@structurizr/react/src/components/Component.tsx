import { IComponent } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ComponentContext } from "../contexts";

export const Component: FC<PropsWithChildren<{ component: IComponent }>> = ({ children }) => {
    const [ component, setComponent ] = useState<IComponent>();

    return (
        <ComponentContext.Provider value={{ component, setComponent }}>
            {children}
        </ComponentContext.Provider>
    )
}