import { useCallback, useContext } from "react";
import { PageContext } from "../contexts";
import { SidebarContent } from "../types";

export const usePageSidebar = () => {
    const { sidebarOptions, setSidebarOptions } = useContext(PageContext);

    const setShowSidebarButton = useCallback((showButton: boolean) => {
        setSidebarOptions?.(state => ({
            ...state,
            showButton
        }));
    }, [setSidebarOptions]);

    const setSidebarOpen = useCallback((isOpen: boolean) => {
        setSidebarOptions?.(state => ({
            ...state,
            isOpen
        }));
    }, [setSidebarOptions]);

    const toggleSidebar = useCallback(() => {
        setSidebarOptions?.(state => ({
            ...state,
            isOpen: !state.isOpen
        }));
    }, [setSidebarOptions]);

    const setSidebarContent = useCallback((content: Partial<SidebarContent>) => {
        setSidebarOptions?.(state => ({
            ...state,
            sections: {
                ...state.sections,
                ...content
            }
        }));
    }, [setSidebarOptions]);

    return {
        sidebarOptions,
        setSidebarContent,
        setSidebarOpen,
        setShowSidebarButton,
        toggleSidebar
    };
}