import { FC } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Text,
    useColorModeValue,
    Wrap,
    WrapItem
} from "@chakra-ui/react";

export interface IDiagramTemplate {
    header: string;
    description: string;
    payload: string;
}

type TemplateItemProps = {
    header: string;
    description: string;
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
            <CardHeader>
                <Heading
                    as={"h2"}
                    size={"sm"}
                >
                    {header}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text
                    fontSize={"sm"}
                    noOfLines={6}
                    pt={4}
                >
                    {description}
                </Text>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
    );
}

type TemplateSelectorProps = {
    templates: Array<IDiagramTemplate>;
    onSelect: (template: IDiagramTemplate) => void;
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({
    templates,
    onSelect
}) => {
    return (
        <Wrap>
            {templates.map(template => (
                <WrapItem key={template.header}>
                    <TemplateItem
                        header={template.header}
                        description={template.description}
                        onClick={() => onSelect(template)}
                    />
                </WrapItem>
            ))}
        </Wrap>
    );
}
