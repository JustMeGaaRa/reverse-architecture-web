import {
    ButtonGroup,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { BinMinusIn, Check, Copy, InputField, MoreHoriz, Xmark } from "iconoir-react";
import { FC, MouseEventHandler, useCallback, useRef, useState } from "react";

export const WorkspaceCardFooter: FC<{
    name: string;
    lastModifiedDate: string;
    isArchived?: boolean;
    onRename?: (value: string) => void;
    onClone?: () => void;
    onArchive?: () => void;
    onRestore?: () => void;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    name,
    lastModifiedDate,
    isArchived,
    onRename,
    onClone,
    onArchive,
    onRestore,
    onDelete
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const [ isRenameMode, setIsRenameMode ] = useState(false);

    const handleOnRenameClick = useCallback(() => {
        setIsRenameMode(true);
    }, []);

    const handleOnRenameCancel = useCallback(() => {
        setIsRenameMode(false);
    }, []);

    const handleOnRenameAccept = useCallback(() => {
        onRename?.(ref.current.value);
        setIsRenameMode(false);
    }, [onRename]);

    const handleOnRenameKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onRename?.(ref.current.value);
            setIsRenameMode(false);
        }
        if (event.key === "Escape") {
            setIsRenameMode(false);
        }
    }, [onRename]);
    
    return (
        <Flex
            padding={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
        >
            {isRenameMode && (
                <InputGroup size={"sm"}>
                    <Input
                        autoFocus
                        ref={ref}
                        defaultValue={name}
                        onBlur={handleOnRenameCancel}
                        onKeyDown={handleOnRenameKeyDown}
                    />
                    <InputRightElement>
                    <ButtonGroup gap={0} spacing={1} size={"xs"}>
                        <IconButton
                            aria-label={"cancel"}
                            icon={<Icon as={Xmark} boxSize={4} />}
                            onClick={handleOnRenameCancel}
                            title={"cancel"}
                            variant={"ghost"}
                        />
                        <IconButton
                            aria-label={"accept"}
                            icon={<Icon as={Check} boxSize={4} />}
                            onClick={handleOnRenameAccept}
                            title={"accept"}
                            variant={"tonal"}
                        />
                    </ButtonGroup>
                    </InputRightElement>
                </InputGroup>
            )}
            {!isRenameMode && (
                <Flex direction={"column"}>
                    <Text color={"white"} noOfLines={1} textStyle={"b3"}>
                        {name}
                    </Text>
                    <Text color={"gray.700"} textStyle={"b5"}>
                        {lastModifiedDate}
                    </Text>
                </Flex>
            )}
            {!isRenameMode && (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label={"more options"}
                        colorScheme={"gray"}
                        icon={<Icon as={MoreHoriz} boxSize={5} />}
                        size={"sm"}
                        variant={"ghost"}
                        title={"more options"}
                    />
                    <MenuList>
                        {!isArchived && (
                            <MenuItem icon={<Icon as={InputField} boxSize={4} />} onClick={handleOnRenameClick}>
                                Rename
                            </MenuItem>
                        )}
                        {!isArchived && (
                            <MenuItem icon={<Icon as={Copy} boxSize={4} />} onClick={onClone}>
                                Clone
                            </MenuItem>
                        )}
                        {!isArchived && (
                            <MenuItem icon={<Icon as={BinMinusIn} boxSize={4} />} onClick={onArchive}>
                                Archive
                            </MenuItem>
                        )}
                        {!!isArchived && (
                            <MenuItem icon={<Icon as={BinMinusIn} boxSize={4} />} onClick={onRestore}>
                                Restore
                            </MenuItem>
                        )}
                        <MenuDivider />
                        <MenuItem icon={<Icon as={BinMinusIn} boxSize={4} />} onClick={onDelete}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </Flex>
    )
}