import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

export const PageContext = createContext<{
    isSidebarOpened: boolean;
    sidebarWidth: [number, number];
    headerHeight: number;
}>({
    isSidebarOpened: false,
    sidebarWidth: [80, 320],
    headerHeight: 80
})

export const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ state, setState ] = useState();
    
    return (
        <PageContext.Provider
            value={{
                isSidebarOpened: false,
                sidebarWidth: [80, 320],
                headerHeight: 80
            }}
        >
            {children}
        </PageContext.Provider>
    )
}

export const usePageContext = () => {
    return useContext(PageContext);
}