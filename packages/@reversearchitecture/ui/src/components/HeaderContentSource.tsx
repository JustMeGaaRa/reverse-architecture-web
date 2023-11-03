import { FC, PropsWithChildren, useEffect } from "react";
import { usePageHeader } from "../hooks";
import { HeaderContent } from "../types";

export const HeaderContentSource: FC<PropsWithChildren<{
    section: keyof HeaderContent;
}>> = ({
    children,
    section
}) => {
    const { setHeaderContent } = usePageHeader();

    useEffect(() => {
        setHeaderContent({ [section]: children });
    }, [setHeaderContent, section])

    return null;
}