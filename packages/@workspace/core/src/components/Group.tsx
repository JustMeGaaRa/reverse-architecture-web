import { IGroup } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { GroupContext } from "../contexts";

export const Group: FC<PropsWithChildren<{ group: IGroup }>> = ({ children }) => {
    const [ group, setGroup ] = useState<IGroup>();

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    )
}