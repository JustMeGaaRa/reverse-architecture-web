import { Link } from "@chakra-ui/react";
import { SearchMenuGroup, useSearchMenu } from "@reversearchitecture/ui";
import { FC, PropsWithChildren, useCallback } from "react";
import { useNavigate } from "react-router";
import { SearchGroup } from "../types";

export const CommandCenterResultGroup: FC<PropsWithChildren<{
    searchGroup: SearchGroup;
}>> = ({
    children,
    searchGroup,
}) => {
    const navigate = useNavigate();
    const { onClose } = useSearchMenu();

    const handleOnSearchGroupClick = useCallback(() => {
        navigate(searchGroup.link);
        onClose();
    }, [searchGroup, navigate, onClose]);

    return (
        <SearchMenuGroup
            title={`${searchGroup.title} (${searchGroup.items.length})`}
            rightElement={
                <Link color={"lime.600"} onClick={handleOnSearchGroupClick}>
                    See all
                </Link>
            }
        >
            {children}
        </SearchMenuGroup>
    )
}