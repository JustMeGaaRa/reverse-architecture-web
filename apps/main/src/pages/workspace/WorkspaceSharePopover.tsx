import {
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";
import { Copy, UserPlus } from "iconoir-react";
import { FC, useCallback } from "react";
import { useSharingOptions } from "workspace";

export const WorkspaceSharePopover: FC = () => {
    const { getSharedLink } = useSharingOptions();
    
    const handleOnCopySharedLink = useCallback(() => {
        navigator.clipboard.writeText(getSharedLink());
    }, [getSharedLink])

    return (
        <Popover closeOnEsc closeOnBlur>
            <PopoverTrigger>
                <IconButton
                    aria-label={"share"}
                    colorScheme={"gray"}
                    icon={<Icon as={UserPlus} boxSize={5} />}
                    size={"md"}
                />
            </PopoverTrigger>
            <PopoverContent backgroundColor={"gray.200"}>
                <PopoverArrow backgroundColor={"gray.200"} />
                <PopoverBody backgroundColor={"gray.300"} margin={2} borderRadius={16}>
                    <Text>
                        Share the link to workspace
                    </Text>
                    <InputGroup>
                        <Input defaultValue={getSharedLink()} />
                        <InputRightElement>
                            <IconButton
                                aria-label={"copy"}
                                colorScheme={"gray"}
                                icon={<Icon as={Copy} boxSize={4} />}
                                size={"sm"}
                                onClick={handleOnCopySharedLink}
                            />
                        </InputRightElement>
                    </InputGroup>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}