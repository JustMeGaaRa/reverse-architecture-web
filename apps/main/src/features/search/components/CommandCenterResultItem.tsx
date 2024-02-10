import { Highlight, Icon } from "@chakra-ui/react";
import { SearchMenuItem, useSearchMenu } from "@reversearchitecture/ui";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router";
import { SearchItem } from "../types";

export const CommandCenterResultItem: FC<{
    searchItem: SearchItem;
    query: string;
}> = ({
    searchItem,
    query
}) => {
    const navigate = useNavigate();
    const { onClose } = useSearchMenu();

    const handleOnSearchItemClick = useCallback(() => {
        navigate(searchItem.link);
        onClose();
    }, [searchItem, navigate, onClose]);

    return (
        <SearchMenuItem
            icon={<Icon as={searchItem.icon} boxSize={4} />}
            onClick={handleOnSearchItemClick}
        >
            <Highlight
                query={query.split(" ")}
                styles={{ backgroundColor: "lime.400" }}
            >
                {searchItem.title}
            </Highlight>
        </SearchMenuItem>
    )
}