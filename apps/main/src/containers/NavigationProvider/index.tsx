import { createContext, FC, PropsWithChildren, useState } from "react";

export interface IContextAction {
    title: string;
    isVisible?: boolean;
    isDisabled?: boolean;
}

export const NavigationContext = createContext<{
    availableActions: any[];
    setAvailableActions: (actions: any[]) => void;
}>({
    availableActions: [],
    setAvailableActions: () => {}
});

export const NavigationProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [ availableActions, setAvailableActions ] = useState<any[]>([]);

    return (
        <NavigationContext.Provider
            value={{
                availableActions,
                setAvailableActions
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

export * from "./hooks";