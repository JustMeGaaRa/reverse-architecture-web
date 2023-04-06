import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowLeft, Menu } from "iconoir-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationBackButton: FC<{
    onClick?: () => void
}> = ({
    onClick
}) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(-1);
        onClick && onClick();
    }

    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            width={"80px"}
        >
            <IconButton
                aria-label={"navigation back button"}
                icon={<ArrowLeft />}
                variant={"ghost"}
                onClick={handleOnClick}
            />
        </Flex>
    )
}