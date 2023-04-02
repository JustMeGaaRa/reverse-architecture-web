import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Switch,
    useColorModeValue
} from "@chakra-ui/react";
import { Copy, ShareAndroid } from "iconoir-react";
import { FC, useRef } from "react";

type SharePopoverProps = {
    link: string;
    onCopy: (link: string) => void;
};

export const SharePopover: FC<SharePopoverProps> = ({
    link,
    onCopy
}) => {
    const inputRef = useRef(null);

    return (
        <Popover
            initialFocusRef={inputRef}
            placement={"bottom-start"}
        >
            <PopoverTrigger>
                <IconButton
                    aria-label={"share"}
                    title={"share"}
                    icon={<ShareAndroid />}
                />
            </PopoverTrigger>
            <PopoverContent
                background={useColorModeValue("whiteAlpha.900", "rgba(31, 33, 35, 1)")}
            >
                <PopoverCloseButton />
                <PopoverHeader>Share Diagram</PopoverHeader>
                <PopoverBody>
                    <FormControl>
                        <FormLabel>Anyone with this link can view this diagram</FormLabel>
                        <InputGroup>
                            <Input
                                type={"url"}
                                ref={inputRef}
                                defaultValue={link}
                                onFocus={(event) => event.target.select()}
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label={"copy"}
                                    title={"copy"}
                                    icon={<Copy />}
                                    onClick={() => onCopy(link)}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Editable</FormLabel>
                        <Switch />
                    </FormControl>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}