import { Link } from "@chakra-ui/react";
import { SearchMenuGroup } from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";

export const CommandCenterResultGroup: FC<PropsWithChildren<{
    title: string;
    onClick?: () => void;
}>> = ({
    children,
    title,
    onClick,
}) => {
    return (
        <SearchMenuGroup
            title={title}
            rightElement={
                <Link color={"lime.600"} onClick={onClick}>
                    See all
                </Link>
            }
        >
            {children}
        </SearchMenuGroup>
    )
}