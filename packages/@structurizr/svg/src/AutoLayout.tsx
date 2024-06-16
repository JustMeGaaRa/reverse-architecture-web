import { FC, useEffect } from "react";
import { useViewMetadata } from "./components";

export interface IAutoLayout {

}

export const AutoLayout: FC<{ value: IAutoLayout }> = ({ value }) => {
    const { metadata } = useViewMetadata();

    useEffect(() => {
        
    }, [metadata]);

    return null;
};
