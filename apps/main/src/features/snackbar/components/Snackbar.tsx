import { ButtonGroup, Divider, Flex, Icon, IconButton, Text, ToastProps } from "@chakra-ui/react";
import { InfoCircle, WarningHexagon, WarningTriangle, Xmark,  } from "iconoir-react";
import { FC, useMemo } from "react";

export type SnackbarProps = ToastProps & {
    action?: React.ReactElement;
};

export const Snackbar: FC<SnackbarProps> = ({ action, status, title, isClosable, onClose }) => {
    const iconProps = useMemo(() => new Map([
        ["info", { icon: InfoCircle, color: "green.600" }],
        ["success", { icon: InfoCircle, color: "blue.600" }],
        ["warning", { icon: WarningTriangle, color: "yellow.600" }],
        ["error", { icon: WarningHexagon, color: "red.600" }]
    ]), []);

    return (
        <Flex
            data-group
            backgroundColor={"surface.tinted-white-5"}
            backdropFilter={"blur(32px)"}
            borderColor={"surface.tinted-white-10"}
            borderWidth={1}
            borderRadius={16}
            boxShadow={"0px 4px 8px 0px rgba(0, 0, 0, 0.10)"}
            height={"40px"}
            padding={1}
            paddingLeft={3}
            justifyContent={"start"}
            alignItems={"center"}
        >
            <Flex flexGrow={0}>
                <Icon
                    as={iconProps.get(status)?.icon}
                    color={iconProps.get(status)?.color}
                    boxSize={"18px"}
                />
            </Flex>
            <Flex flex={2}>
                <Text
                    color={"gray.900"}
                    paddingLeft={2}
                    paddingRight={4}
                    textStyle={"b3"}
                    _groupHover={{ color: "white" }}
                >
                    {title}
                </Text>
            </Flex>
            <Flex flexGrow={0} alignItems={"center"}>
                {action && (
                    <Divider orientation={"vertical"} height={"16px"} padding={1} />
                )}
                <ButtonGroup size={"sm"} variant={"ghost"}>
                    {action}
                    {isClosable && (
                        <IconButton
                            aria-label={"close"}
                            icon={<Icon as={Xmark} boxSize={5} />}
                            title={"close"}
                            variant={"tonal"}
                            onClick={onClose}
                        />
                    )}
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}