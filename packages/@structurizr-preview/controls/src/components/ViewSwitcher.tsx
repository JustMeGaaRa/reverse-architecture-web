import { Divider, IconButton, StackDivider } from "@chakra-ui/react";
import { ArrowsSplitDown, FlowChart, NodesDistributed } from "@restruct/icons";
import { ButtonSegmentedToggle } from "@restruct/segmented-toggle";
import { Toolbar, ToolbarSection } from "@restruct/toolbar";
import { FC, useCallback, useState } from "react";

export const ViewSwitcherToggle: FC = () => {
    const [ mode, setMode ] = useState("diagramming");

    const handleOnClickDiagrammingMode = useCallback(() => {
        setMode("diagramming");
        // setCurrentView(workspace.views.systemLandscape);
    }, []);

    const handleOnClickModelingMode = useCallback(() => {
        setMode("modeling");
        // setCurrentView(createDefaultModelView());
    }, []);

    const handleOnClickDeploymentMode = useCallback(() => {
        setMode("deployment");
        // setCurrentView(workspace.views.deployments?.at(0));
    }, []);

    return (
        <ButtonSegmentedToggle size={"sm"}>
            <IconButton
                aria-label={"diagramming"}
                colorScheme={"lime"}
                isActive={mode === "diagramming"}
                icon={<NodesDistributed />}
                title={"diagramming"}
                onClick={handleOnClickDiagrammingMode}
            />
            <Divider 
                borderColor={mode === "deployment" ? "gray.400" : "transparent"}
                borderWidth={1}
                height={"24px"}
                alignSelf={"center"}
            />
            <IconButton
                aria-label={"modeling"}
                colorScheme={"lime"}
                isActive={mode === "modeling"}
                icon={<FlowChart />}
                title={"modeling"}
                onClick={handleOnClickModelingMode}
            />
            <Divider 
                borderColor={mode === "diagramming" ? "gray.400" : "transparent"}
                borderWidth={1}
                height={"24px"}
                alignSelf={"center"}
            />
            <IconButton
                aria-label={"deployment"}
                colorScheme={"lime"}
                isActive={mode === "deployment"}
                icon={<ArrowsSplitDown />}
                title={"deployment"}
                onClick={handleOnClickDeploymentMode}
            />
        </ButtonSegmentedToggle>
    );
};
