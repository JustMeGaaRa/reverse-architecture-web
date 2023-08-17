import {
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    List,
    ListItem,
    Text,
    useColorModeValue,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import { FC, useState } from "react";

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
    const defaultBorder = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.1)");
    const defaultBackground = useColorModeValue("blackAlpha.100", "rgba(31, 33, 35, 0.9)");
    const activeBorder = useColorModeValue("blackAlpha.300", "#E5FF00");
    const activeBackground = useColorModeValue("gray.100", "rgba(229, 255, 0, 0.05)");    
    const activeColor = useColorModeValue("gray.800", "#E3FB51");

    return (
        <Card
            backgroundColor={defaultBackground}
            borderColor={defaultBorder}
            width={200}
            height={200}
            variant={"outline"}
            _hover={{
                background: activeBackground,
                borderColor: activeBorder,
                color: activeColor,
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
    const AllGroupName = "All";
    const [selectedGroup, setSelectedGroup] = useState(AllGroupName);
    const selectedTemplates = templates
        .filter(group => group.templates.length > 0)
        .filter(group => selectedGroup === AllGroupName || selectedGroup === group.header);

    const defaultColor = useColorModeValue("gray.800", "#ffffff");
    const activeColor = useColorModeValue("gray.800", "#E5FF00");

    return (
        <Flex gap={5} justify={"space-between"}>
            <List maxWidth={150}>
                <ListItem
                    style={{ color: selectedGroup === AllGroupName ? activeColor : defaultColor }}
                    onClick={() => setSelectedGroup(AllGroupName)}
                >
                    {AllGroupName}
                </ListItem>

                {templates.map(group => (
                    <ListItem
                        key={group.header}
                        style={{ color: selectedGroup === group.header ? activeColor : defaultColor }}
                        onClick={() => setSelectedGroup(group.header)}
                    >
                        {`${group.header} (${group.templates.length})`}
                    </ListItem>
                ))}
            </List>
            <Box
                flex={1}
                maxHeight={["lg", "xl", "2xl"]}
                px={5}
                overflowY={"scroll"}
            >
                {selectedTemplates.map(group => (
                    <TemplateGroup
                        key={group.header}
                        header={group.header}
                        templates={group.templates}
                        onSelected={onSelected}
                    />
                ))}
            </Box>
        </Flex>
    );
}
