import { Box, IconButton } from "@chakra-ui/react";
import { HomeSimple } from "iconoir-react";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface HomeButtonProps {
    text?: string;
}

export const HomeButton: FC<HomeButtonProps> = (props) => {
    return (
        <Box as={Link} to={"/"}>
            <IconButton
                aria-label={"home"}
                title={"home"}
                icon={<HomeSimple />}
            />
        </Box>
    );
};
