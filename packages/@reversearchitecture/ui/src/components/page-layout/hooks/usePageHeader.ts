import { useCallback, useContext } from "react";
import { PageContext } from "../contexts";
import { HeaderContent } from "../types";

export const usePageHeader = () => {
    const { headerOptions, setHeaderOptions } = useContext(PageContext);

    const setHeaderContent = useCallback((content: Partial<HeaderContent>) => {
        setHeaderOptions?.(state => ({
            ...state,
            sections: {
                ...state.sections,
                ...content
            }
        }));
    }, [setHeaderOptions]);

    return {
        headerOptions,
        setHeaderContent
    };
}