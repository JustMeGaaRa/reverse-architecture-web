import { Highlight, Icon } from "@chakra-ui/react";
import { SearchMenuItem } from "@reversearchitecture/ui";
import { FC } from "react";

export const CommandCenterResultItem: FC<{
    title: string;
    query: string;
    icon: any;
    onClick?: () => void;
}> = ({
    title,
    query,
    icon,
    onClick
}) => {
    return (
        <SearchMenuItem
            icon={<Icon as={icon} boxSize={4} />}
            onClick={onClick}
        >
            <Highlight
                query={query.split(" ")}
                styles={{ backgroundColor: "lime.400" }}
            >
                {title}
            </Highlight>
        </SearchMenuItem>
    )
}