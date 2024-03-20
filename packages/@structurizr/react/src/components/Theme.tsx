import * as Structurizr from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect } from "react";
import { useThemes } from "../hooks";

export const Theme: FC<PropsWithChildren<{ url: Structurizr.Theme }>> = ({ children, url }) => {
    const { themes, setThemes } = useThemes();

    useEffect(() => {
        // TODO: fetch theme and pass to the provider
    }, []);

    return null;
}