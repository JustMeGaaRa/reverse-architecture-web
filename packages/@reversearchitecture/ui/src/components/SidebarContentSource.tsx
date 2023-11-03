import { FC, PropsWithChildren, useEffect } from "react";
import { usePageSidebar } from "../hooks";
import { SidebarContent } from "../types";

export const SidebarContentSource: FC<PropsWithChildren<{
    section: keyof SidebarContent;
}>> = ({
    children,
    section
}) => {
    const { setSidebarContent } = usePageSidebar();

    useEffect(() => {
        setSidebarContent({ [section]: children });
    }, [setSidebarContent, section])

    return null;
}