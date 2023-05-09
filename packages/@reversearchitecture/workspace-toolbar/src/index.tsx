import {
    IconButton
} from "@chakra-ui/react";
import * as DSL from "@structurizr/dsl";
import {
    ToolbalSection,
    Toolbar,
    useWorkspaceStore,
    WorkspaceStore
} from "@reversearchitecture/workspace-viewer";
import { useReactFlow } from "@reactflow/core";
import { useInteractionMode } from "./useInteractionMode";
import {
    BinMinus,
    Cancel,
    ChatAdd,
    Circle,
    CursorPointer,
    DragHandGesture,
    Play,
    Redo,
    Rhombus,
    Square,
    Triangle,
    Undo
} from "iconoir-react";
import {
    FC,
    MouseEvent,
    useCallback,
} from "react";
import { v4 } from "uuid";
import { Component, Container, Person, SoftwareSystem } from "@structurizr/dsl";

const AllowElementsSelector = (state: WorkspaceStore) => {
    const isSystemLandscapView = state.selectedView.type === "System Landscape"
    const isSystemContextView = state.selectedView.type === "System Context"
    const isContainerView = state.selectedView.type === "Container"
    const isComponentView = state.selectedView.type === "Component"
    const isDeploymentView = state.selectedView.type === "Deployment"

    return {
        allowPerson: isSystemLandscapView || isSystemContextView || isContainerView || isComponentView,
        allowSoftwareSystem: isSystemLandscapView || isSystemContextView || isContainerView || isComponentView,
        allowContainer: isContainerView || isComponentView,
        allowComponent: isComponentView,
        allowDeploymentNode: isDeploymentView
    }
}

export const WorkspaceToolbar: FC<{
    
}> = ({

}) => {
    const { project } = useReactFlow();
    const store = useWorkspaceStore();
    const {
        allowPerson,
        allowSoftwareSystem,
        allowContainer,
        allowComponent,
        allowDeploymentNode
    } = useWorkspaceStore(AllowElementsSelector);
    const { isPresentationMode, isBuilderMode, toggleMode } = useInteractionMode();

    const onAddPerson = useCallback(() => {
        const person = new Person({
            identifier: v4(),
            name: "Person",
            description: "A person"
        });
        const position = project({ x: 0, y: 0 });
        store.addPerson({ person, position });
    }, [project, store]);

    const onAddSoftwareSystem = useCallback(() => {
        const softwareSystem = new SoftwareSystem({
            identifier: v4(),
            name: "Software System",
            description: "A software system"
        });
        const position = project({ x: 0, y: 0 });
        store.addSoftwareSystem({ softwareSystem, position });
    }, [project, store]);

    const onAddContainer = useCallback(() => {
        const container = new Container({
            identifier: v4(),
            name: "Container",
            description: "A container"
        });
        const position = project({ x: 0, y: 0 });
        store.addContainer({ container, position, softwareSystemIdentifier: "" });
    }, [project, store]);

    const onAddComponent = useCallback(() => {
        const component = new Component({
            identifier: v4(),
            name: "Component",
            description: "A component"
        });
        const position = project({ x: 0, y: 0 });
        store.addComponent({ component, position, containerIdentifier: "", softwareSystemIdentifier: "" });
    }, [project, store]);

    return (
        <Toolbar>
            <ToolbalSection>
                <IconButton
                    aria-label={"cursor"}
                    isActive={isBuilderMode}
                    icon={<CursorPointer />}
                    title={"cursor"}
                    onClick={toggleMode}
                />
                <IconButton
                    aria-label={"drag"}
                    isActive={isPresentationMode}
                    icon={<DragHandGesture />}
                    title={"drag"}
                    onClick={toggleMode}
                />
            </ToolbalSection>
            
            <ToolbalSection>
                {allowPerson && (
                    <IconButton
                        aria-label={"person"}
                        icon={<Square />}
                        title={"person"}
                        onClick={onAddPerson}
                    />
                )}
                {allowSoftwareSystem && (
                    <IconButton
                        aria-label={"software system"}
                        icon={<Circle />}
                        title={"software system"}
                        onClick={onAddSoftwareSystem}
                    />
                )}
                {allowContainer && (
                    <IconButton
                        aria-label={"container"}
                        icon={<Triangle />}
                        title={"container"}
                        onClick={onAddContainer}
                    />
                )}
                {allowComponent && (
                    <IconButton
                        aria-label={"component"}
                        icon={<Rhombus />}
                        title={"component"}
                        onClick={onAddComponent}
                    />
                )}
            </ToolbalSection>

            <ToolbalSection>
                <IconButton
                    aria-label={"comment"}
                    icon={<ChatAdd />}
                    title={"comment"}
                />
            </ToolbalSection>

            <ToolbalSection>
                <IconButton
                    aria-label={"delete selected element"}
                    icon={<BinMinus />}
                    title={"delete selected"}
                />
                <IconButton
                    aria-label={"undo last change"}
                    icon={<Undo />}
                    title={"undo last change"}
                />
                <IconButton
                    aria-label={"redo last change"}
                    icon={<Redo />}
                    title={"redo last change"}
                />
            </ToolbalSection>

            <ToolbalSection>
                {isPresentationMode && (
                    <IconButton
                        aria-label={"exit mode"}
                        icon={<Cancel />}
                        title={"exit mode"}
                        onClick={toggleMode}
                    />
                )}
                {isBuilderMode && (
                    <IconButton
                        aria-label={"presentation"}
                        icon={<Play />}
                        title={"presentation"}
                        onClick={toggleMode}
                    />
                )}
            </ToolbalSection>
        </Toolbar>
    )
}