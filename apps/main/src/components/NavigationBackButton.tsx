import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowLeft } from "iconoir-react";
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
        >
            <IconButton
                aria-label={"navigation back button"}
                colorScheme={"gray"}
                icon={<ArrowLeft />}
                size={"lg"}
                variant={"ghost"}
                onClick={handleOnClick}
            />
        </Flex>
    )
}