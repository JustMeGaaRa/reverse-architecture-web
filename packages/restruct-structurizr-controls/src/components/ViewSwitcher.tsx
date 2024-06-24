import { IconButton, Tooltip } from "@chakra-ui/react";
import { ArrowsSplitDown, FlowChart, NodesDistributed } from "@restruct/icons";
import { ButtonSegmentedToggle } from "@restruct/segmented-toggle";
import { createDefaultModelView } from "@structurizr/dsl";
import { useWorkspace, useViewNavigation } from "@structurizr/react";
import { FC, useCallback, useState } from "react";

export const ViewSwitcherToggle: FC = () => {
    const [ mode, setMode ] = useState("diagramming");
    const { workspace } = useWorkspace();
    const { setCurrentView } = useViewNavigation();

    const handleOnClickDiagrammingMode = useCallback(() => {
        setMode("diagramming");
        setCurrentView(workspace.views.systemLandscape);
    }, [setCurrentView, workspace.views.systemLandscape]);

    const handleOnClickModelingMode = useCallback(() => {
        setMode("modeling");
        setCurrentView(createDefaultModelView());
    }, [setCurrentView]);

    const handleOnClickDeploymentMode = useCallback(() => {
        setMode("deployment");
        setCurrentView(workspace.views.deployments?.at(0));
    }, [setCurrentView, workspace.views.deployments]);

    return (
        <ButtonSegmentedToggle size={"sm"}>
            <Tooltip label={"Diagramming"} openDelay={500}>
                <IconButton
                    aria-label={"diagramming"}
                    colorScheme={"lime"}
                    isActive={mode === "diagramming"}
                    icon={<NodesDistributed />}
                    title={"diagramming"}
                    onClick={handleOnClickDiagrammingMode}
                />
            </Tooltip>
            <Tooltip label={"Modeling"} openDelay={500}>
                <IconButton
                    aria-label={"modeling"}
                    colorScheme={"lime"}
                    isActive={mode === "modeling"}
                    icon={<FlowChart />}
                    title={"modeling"}
                    onClick={handleOnClickModelingMode}
                />
            </Tooltip>
            <Tooltip label={"Deployment"} openDelay={500}>
                <IconButton
                    aria-label={"deployment"}
                    colorScheme={"lime"}
                    isActive={mode === "deployment"}
                    icon={<ArrowsSplitDown />}
                    title={"deployment"}
                    onClick={handleOnClickDeploymentMode}
                />
            </Tooltip>
        </ButtonSegmentedToggle>
    );
};
