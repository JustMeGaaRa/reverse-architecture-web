import { FC, PropsWithChildren, useCallback, useState } from "react";
import { PageContext } from "../contexts";
import { HeaderOptions, PageOptions, SetStateAction, SidebarOptions } from "../types";

export const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ state, setState ] = useState<PageOptions>({
        sidebarOptions: {
            isOpen: false,
            showButton: true,
            width: [64, 320],
            sections: {
                logo: [],
                top: [],
                middle: [],
                bottom: [],
            }
        },
        headerOptions: {
            height: 64,
            sections: {
                left: [],
                middle: [],
                right: [],
            }
        }
    });

    const setHeaderOptions = useCallback((func: SetStateAction<HeaderOptions>) => {
        setState(state => ({
            ...state,
            headerOptions: func(state.headerOptions)
        }));
    }, []);

    const setSidebarOptions = useCallback((func: SetStateAction<SidebarOptions>) => {
        setState(state => ({
            ...state,
            sidebarOptions: func(state.sidebarOptions)
        }));
    }, []);

    return (
        <PageContext.Provider
            value={{
                ...state,
                setHeaderOptions,
                setSidebarOptions
            }}
        >
            {children}
        </PageContext.Provider>
    )
}