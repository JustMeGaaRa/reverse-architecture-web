import { Box } from "@chakra-ui/react";
import { RaIconButton } from "@reversearchitecture/ui";
import { HomeSimple } from "iconoir-react";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface HomeButtonProps {
    text?: string;
}

export const HomeButton: FC<HomeButtonProps> = (props) => {
    return (
        <Box as={Link} to={"/"}>
            <RaIconButton
                aria-label={"home"}
                title={"home"}
                icon={<HomeSimple />}
            />
        </Box>
    );
};
