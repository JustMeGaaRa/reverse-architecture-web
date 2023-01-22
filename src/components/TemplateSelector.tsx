import { FC } from "react";
import {
    Box,
    Card,
    CardBody,
    Heading,
    Text,
    useColorModeValue,
    Wrap,
    WrapItem
} from "@chakra-ui/react";

export type DiagramTemplate = {
    header: string;
    description: string;
    payload: string;
}

export type DiagramTemplateGroup = {
    header: string;
    templates: Array<DiagramTemplate>;
}

type TemplateItemProps = Omit<DiagramTemplate, "payload"> & {
    onClick: () => void;
};

const TemplateItem: FC<TemplateItemProps> = ({
    header,
    description,
    onClick
}) => {
    const defaultBackground = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
    const highlightBackground = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

    return (
        <Card
            background={defaultBackground}
            width={200}
            height={200}
            variant={"outline"}
            _hover={{
                background: highlightBackground,
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            <CardBody>
                <Heading
                    as={"h2"}
                    size={"sm"}
                >
                    {header}
                </Heading>
                <Text
                    fontSize={"sm"}
                    noOfLines={5}
                    pt={4}
                    title={description}
                >
                    {description}
                </Text>
            </CardBody>
        </Card>
    );
}

type TemplateGroupProps = DiagramTemplateGroup & {
    onSelected: (template: DiagramTemplate) => void;
}

const TemplateGroup: FC<TemplateGroupProps> = ({
    header,
    templates,
    onSelected
}) => {
    return (
        <Box py={5}>
            <Heading as={"h2"} fontSize={["sm"]} pb={4}>
                {header}
            </Heading>
            <Wrap>
                {templates.map(template => (
                    <WrapItem key={template.header}>
                        <TemplateItem
                            header={template.header}
                            description={template.description}
                            onClick={() => onSelected(template)}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </Box>
    );
}

type TemplateSelectorProps = {
    templates: Array<DiagramTemplateGroup>;
    onSelected: (template: DiagramTemplate) => void;
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({
    templates,
    onSelected
}) => {
    return (
        <>
            {templates.map(group => (
                <TemplateGroup
                    key={group.header}
                    header={group.header}
                    templates={group.templates}
                    onSelected={onSelected}
                />
            ))}
        </>
    );
}
