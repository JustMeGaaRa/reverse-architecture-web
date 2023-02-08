import { CopyIcon } from "@chakra-ui/icons";
import {
    Button,
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
    Switch
} from "@chakra-ui/react";
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
            placement={"bottom-end"}
            closeOnBlur={true}
            closeOnEsc={true}
        >
            <PopoverTrigger>
                <Button>
                    Share
                </Button>
            </PopoverTrigger>
            <PopoverContent>
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
                                    icon={<CopyIcon />}
                                    variant={"ghost"}
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