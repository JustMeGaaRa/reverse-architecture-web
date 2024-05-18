import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface WorkspaceCstNode extends CstNode {
  name: "workspace";
  children: WorkspaceCstChildren;
}

export type WorkspaceCstChildren = {
  workspaceLiteral: IToken[];
  nameParameter?: IToken[];
  descriptionParameter?: IToken[];
  LCurly: IToken[];
  nameProperty?: NamePropertyCstNode[];
  descriptionProperty?: DescriptionPropertyCstNode[];
  propertiesProperty?: PropertiesPropertyCstNode[];
  modelNode: ModelCstNode[];
  viewsNode: ViewsCstNode[];
  RCurly: IToken[];
};

export interface ModelCstNode extends CstNode {
  name: "model";
  children: ModelCstChildren;
}

export type ModelCstChildren = {
  modelLiteral: IToken[];
  LCurly: IToken[];
  groupNodes?: ModelGroupCstNode[];
  peopleNodes?: PersonCstNode[];
  softwareSystemNodes?: SoftwareSystemCstNode[];
  deploymentEnvironmentNodes?: DeploymentEnvironmentCstNode[];
  relationshipNodes?: RelationshipCstNode[];
  RCurly: IToken[];
};

export interface ModelGroupCstNode extends CstNode {
  name: "modelGroup";
  children: ModelGroupCstChildren;
}

export type ModelGroupCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  groupLiteral: IToken[];
  nameParameter: IToken[];
  LCurly: IToken[];
  personNodes?: PersonCstNode[];
  softwareSystemNodes?: SoftwareSystemCstNode[];
  RCurly: IToken[];
};

export interface PersonCstNode extends CstNode {
  name: "person";
  children: PersonCstChildren;
}

export type PersonCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  personLiteral: IToken[];
  nameParameter: IToken[];
  descriptionParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface SoftwareSystemCstNode extends CstNode {
  name: "softwareSystem";
  children: SoftwareSystemCstChildren;
}

export type SoftwareSystemCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  softwareSystemLiteral: IToken[];
  nameParameter: IToken[];
  descriptionParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  groupNodes?: SoftwareSystemGroupCstNode[];
  containerNodes?: ContainerCstNode[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface SoftwareSystemGroupCstNode extends CstNode {
  name: "softwareSystemGroup";
  children: SoftwareSystemGroupCstChildren;
}

export type SoftwareSystemGroupCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  groupLiteral: IToken[];
  nameParameter: IToken[];
  LCurly: IToken[];
  containerNodes?: ContainerCstNode[];
  RCurly: IToken[];
};

export interface ContainerCstNode extends CstNode {
  name: "container";
  children: ContainerCstChildren;
}

export type ContainerCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  containerLiteral: IToken[];
  nameParameter: IToken[];
  descriptionParameter?: IToken[];
  technologyParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  groupNodes?: ContainerGroupCstNode[];
  componentNodes?: ComponentCstNode[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface ContainerGroupCstNode extends CstNode {
  name: "containerGroup";
  children: ContainerGroupCstChildren;
}

export type ContainerGroupCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  groupLiteral: IToken[];
  nameParameter: IToken[];
  LCurly: IToken[];
  componentNodes?: ComponentCstNode[];
  RCurly: IToken[];
};

export interface ComponentCstNode extends CstNode {
  name: "component";
  children: ComponentCstChildren;
}

export type ComponentCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  componentLiteral: IToken[];
  nameParameter: IToken[];
  descriptionParameter?: IToken[];
  technologyParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface DeploymentEnvironmentCstNode extends CstNode {
  name: "deploymentEnvironment";
  children: DeploymentEnvironmentCstChildren;
}

export type DeploymentEnvironmentCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  deploymentEnvironmentLiteral: IToken[];
  nameParameter: IToken[];
  LCurly: IToken[];
  elementProperties: ElementPropertiesCstNode[];
  deploymentNodeNodes?: DeploymentNodeCstNode[];
  relationshipNodes?: RelationshipCstNode[];
  RCurly: IToken[];
};

export interface DeploymentNodeCstNode extends CstNode {
  name: "deploymentNode";
  children: DeploymentNodeCstChildren;
}

export type DeploymentNodeCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  deploymentNodeLiteral: IToken[];
  nameParameter: IToken[];
  descriptionParameter?: IToken[];
  technologyParameter?: IToken[];
  tagsParameter?: IToken[];
  instancesParameter?: IToken[];
  LCurly: IToken[];
  deploymentNodeNodes?: DeploymentNodeCstNode[];
  infrastructureNodeNodes?: InfrastructureNodeCstNode[];
  softwareSystemInstanceNodes?: SoftwareSystemInstanceCstNode[];
  containerInstanceNodes?: ContainerInstanceCstNode[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly: IToken[];
};

export interface InfrastructureNodeCstNode extends CstNode {
  name: "infrastructureNode";
  children: InfrastructureNodeCstChildren;
}

export type InfrastructureNodeCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  infrastructureNodeLiteral: IToken[];
  nameParameter: IToken[];
  descriptionParameter?: IToken[];
  technologyParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface SoftwareSystemInstanceCstNode extends CstNode {
  name: "softwareSystemInstance";
  children: SoftwareSystemInstanceCstChildren;
}

export type SoftwareSystemInstanceCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  softwareSystemInstanceLiteral: IToken[];
  softwareSystemIdentifier: IToken[];
  deploymentGroupsParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface ContainerInstanceCstNode extends CstNode {
  name: "containerInstance";
  children: ContainerInstanceCstChildren;
}

export type ContainerInstanceCstChildren = {
  elementIdentifier?: IToken[];
  Equals?: IToken[];
  containerInstanceLiteral: IToken[];
  containerIdentifier: IToken[];
  deploymentGroupsParameter?: IToken[];
  tagsParameter?: IToken[];
  LCurly?: IToken[];
  relationshipNodes?: RelationshipCstNode[];
  elementProperties?: ElementPropertiesCstNode[];
  RCurly?: IToken[];
};

export interface RelationshipCstNode extends CstNode {
  name: "relationship";
  children: RelationshipCstChildren;
}

export type RelationshipCstChildren = {
  sourceIdentifier: IToken[];
  relationshipArrowLiteral: IToken[];
  targetIdentifier: IToken[];
  descriptionParameter?: IToken[];
  technologyParameter?: IToken[];
  tagsParameter?: IToken[];
};

export interface ElementPropertiesCstNode extends CstNode {
  name: "elementProperties";
  children: ElementPropertiesCstChildren;
}

export type ElementPropertiesCstChildren = {
  nameProperty?: NamePropertyCstNode[];
  technologyProperty?: TechnologyPropertyCstNode[];
  descriptionProperty?: DescriptionPropertyCstNode[];
  propertiesProperty?: PropertiesPropertyCstNode[];
  perspectivesProperty?: PerspectivesPropertyCstNode[];
  tagsProperty?: TagsPropertyCstNode[];
  urlProperty?: UrlPropertyCstNode[];
};

export interface ViewsCstNode extends CstNode {
  name: "views";
  children: ViewsCstChildren;
}

export type ViewsCstChildren = {
  viewsLiteral: IToken[];
  LCurly: IToken[];
  systemLandscapeViewNodes?: SystemLandscapeViewCstNode[];
  systemContextViewNodes?: SystemContextViewCstNode[];
  containerViewNodes?: ContainerViewCstNode[];
  componentViewNodes?: ComponentViewCstNode[];
  deploymentViewNodes?: DeploymentViewCstNode[];
  stylesNodes?: StylesCstNode[];
  themesNodes?: ThemesPropertyCstNode[];
  RCurly: IToken[];
};

export interface SystemLandscapeViewCstNode extends CstNode {
  name: "systemLandscapeView";
  children: SystemLandscapeViewCstChildren;
}

export type SystemLandscapeViewCstChildren = {
  systemLandscapeLiteral: IToken[];
  keyParameter?: IToken[];
  descriptionParameter?: IToken[];
  LCurly: IToken[];
  viewProperties: ViewPropertiesCstNode[];
  RCurly: IToken[];
};

export interface SystemContextViewCstNode extends CstNode {
  name: "systemContextView";
  children: SystemContextViewCstChildren;
}

export type SystemContextViewCstChildren = {
  systemContextLiteral: IToken[];
  softwareSystemIdentifier: IToken[];
  keyParameter?: IToken[];
  descriptionParameter?: IToken[];
  LCurly: IToken[];
  viewProperties: ViewPropertiesCstNode[];
  RCurly: IToken[];
};

export interface ContainerViewCstNode extends CstNode {
  name: "containerView";
  children: ContainerViewCstChildren;
}

export type ContainerViewCstChildren = {
  containerLiteral: IToken[];
  softwareSystemIdentifier: IToken[];
  keyParameter?: IToken[];
  descriptionParameter?: IToken[];
  LCurly: IToken[];
  viewProperties: ViewPropertiesCstNode[];
  RCurly: IToken[];
};

export interface ComponentViewCstNode extends CstNode {
  name: "componentView";
  children: ComponentViewCstChildren;
}

export type ComponentViewCstChildren = {
  componentLiteral: IToken[];
  containerIdentifier: IToken[];
  keyParameter?: IToken[];
  descriptionParameter?: IToken[];
  LCurly: IToken[];
  viewProperties: ViewPropertiesCstNode[];
  RCurly: IToken[];
};

export interface DeploymentViewCstNode extends CstNode {
  name: "deploymentView";
  children: DeploymentViewCstChildren;
}

export type DeploymentViewCstChildren = {
  deploymentLiteral: IToken[];
  softwareSystemIdentifier: IToken[];
  environmentParameter: IToken[];
  keyParameter?: IToken[];
  descriptionParameter?: IToken[];
  LCurly: IToken[];
  viewProperties: ViewPropertiesCstNode[];
  RCurly: IToken[];
};

export interface ViewPropertiesCstNode extends CstNode {
  name: "viewProperties";
  children: ViewPropertiesCstChildren;
}

export type ViewPropertiesCstChildren = {
  includeProperty?: IncludePropertyCstNode[];
  excludeProperty?: ExcludePropertyCstNode[];
  autoLayoutProperty?: AutoLayoutPropertyCstNode[];
  defaultProperty?: DefaultPropertyCstNode[];
  descriptionProperty?: DescriptionPropertyCstNode[];
  propertiesProperty?: PropertiesPropertyCstNode[];
  animationProperty?: AnimationPropertyCstNode[];
  titleProperty?: TitlePropertyCstNode[];
};

export interface NamePropertyCstNode extends CstNode {
  name: "nameProperty";
  children: NamePropertyCstChildren;
}

export type NamePropertyCstChildren = {
  Name: IToken[];
  StringLiteral: IToken[];
};

export interface TechnologyPropertyCstNode extends CstNode {
  name: "technologyProperty";
  children: TechnologyPropertyCstChildren;
}

export type TechnologyPropertyCstChildren = {
  Technology: IToken[];
  StringLiteral: IToken[];
};

export interface DescriptionPropertyCstNode extends CstNode {
  name: "descriptionProperty";
  children: DescriptionPropertyCstChildren;
}

export type DescriptionPropertyCstChildren = {
  Description: IToken[];
  StringLiteral: IToken[];
};

export interface TagsPropertyCstNode extends CstNode {
  name: "tagsProperty";
  children: TagsPropertyCstChildren;
}

export type TagsPropertyCstChildren = {
  Tags: IToken[];
  StringLiteral?: IToken[];
};

export interface UrlPropertyCstNode extends CstNode {
  name: "urlProperty";
  children: UrlPropertyCstChildren;
}

export type UrlPropertyCstChildren = {
  Url: IToken[];
  StringLiteral: IToken[];
};

export interface PropertiesPropertyCstNode extends CstNode {
  name: "propertiesProperty";
  children: PropertiesPropertyCstChildren;
}

export type PropertiesPropertyCstChildren = {
  Properties: IToken[];
  LCurly: IToken[];
  Identifier?: IToken[];
  RCurly: IToken[];
};

export interface PerspectivesPropertyCstNode extends CstNode {
  name: "perspectivesProperty";
  children: PerspectivesPropertyCstChildren;
}

export type PerspectivesPropertyCstChildren = {
  Perspectives: IToken[];
  LCurly: IToken[];
  Identifier?: IToken[];
  RCurly: IToken[];
};

export interface IncludePropertyCstNode extends CstNode {
  name: "includeProperty";
  children: IncludePropertyCstChildren;
}

export type IncludePropertyCstChildren = {
  Include: IToken[];
  Wildcard?: IToken[];
  Identifier?: IToken[];
};

export interface ExcludePropertyCstNode extends CstNode {
  name: "excludeProperty";
  children: ExcludePropertyCstChildren;
}

export type ExcludePropertyCstChildren = {
  Exclude: IToken[];
  Wildcard?: IToken[];
  Identifier?: IToken[];
};

export interface AutoLayoutPropertyCstNode extends CstNode {
  name: "autoLayoutProperty";
  children: AutoLayoutPropertyCstChildren;
}

export type AutoLayoutPropertyCstChildren = {
  AutoLayout: IToken[];
  Identifier?: IToken[];
  NumericLiteral?: (IToken)[];
};

export interface DefaultPropertyCstNode extends CstNode {
  name: "defaultProperty";
  children: DefaultPropertyCstChildren;
}

export type DefaultPropertyCstChildren = {
  Default: IToken[];
};

export interface AnimationPropertyCstNode extends CstNode {
  name: "animationProperty";
  children: AnimationPropertyCstChildren;
}

export type AnimationPropertyCstChildren = {
  Animation: IToken[];
  LCurly: IToken[];
  Identifier?: IToken[];
  RCurly: IToken[];
};

export interface TitlePropertyCstNode extends CstNode {
  name: "titleProperty";
  children: TitlePropertyCstChildren;
}

export type TitlePropertyCstChildren = {
  Title: IToken[];
  StringLiteral: IToken[];
};

export interface ThemesPropertyCstNode extends CstNode {
  name: "themesProperty";
  children: ThemesPropertyCstChildren;
}

export type ThemesPropertyCstChildren = {
  Themes: IToken[];
  UrlLiteral: IToken[];
};

export interface StylesCstNode extends CstNode {
  name: "styles";
  children: StylesCstChildren;
}

export type StylesCstChildren = {
  Styles: IToken[];
  LCurly: IToken[];
  elementStyle?: ElementStyleCstNode[];
  relationshipStyle?: RelationshipStyleCstNode[];
  RCurly: IToken[];
};

export interface ElementStyleCstNode extends CstNode {
  name: "elementStyle";
  children: ElementStyleCstChildren;
}

export type ElementStyleCstChildren = {
  Element: IToken[];
  StringLiteral: IToken[];
  LCurly: IToken[];
  shape?: ShapeCstNode[];
  icon?: IconCstNode[];
  width?: WidthCstNode[];
  height?: HeightCstNode[];
  background?: BackgroundCstNode[];
  color?: ColorCstNode[];
  stroke?: StrokeCstNode[];
  strokeWidth?: StrokeWidthCstNode[];
  fontSize?: FonSizeCstNode[];
  border?: BorderCstNode[];
  opacity?: OpacityCstNode[];
  metadata?: MetadataCstNode[];
  descriptionProperty?: DescriptionPropertyCstNode[];
  propertiesProperty?: PropertiesPropertyCstNode[];
  RCurly: IToken[];
};

export interface RelationshipStyleCstNode extends CstNode {
  name: "relationshipStyle";
  children: RelationshipStyleCstChildren;
}

export type RelationshipStyleCstChildren = {
  Relationship: IToken[];
  StringLiteral: IToken[];
  LCurly: IToken[];
  thickness?: ThicknessCstNode[];
  dashed?: DashedCstNode[];
  color?: ColorCstNode[];
  style?: StyleCstNode[];
  routing?: RoutingCstNode[];
  fontSize?: FonSizeCstNode[];
  width?: WidthCstNode[];
  position?: PositionCstNode[];
  opacity?: OpacityCstNode[];
  propertiesProperty?: PropertiesPropertyCstNode[];
  RCurly: IToken[];
};

export interface ShapeCstNode extends CstNode {
  name: "shape";
  children: ShapeCstChildren;
}

export type ShapeCstChildren = {
  Shape: IToken[];
  Identifier: IToken[];
};

export interface IconCstNode extends CstNode {
  name: "icon";
  children: IconCstChildren;
}

export type IconCstChildren = {
  Icon: IToken[];
  Identifier: IToken[];
};

export interface ColorCstNode extends CstNode {
  name: "color";
  children: ColorCstChildren;
}

export type ColorCstChildren = {
  Color: IToken[];
  HexColorLiteral: IToken[];
};

export interface StrokeCstNode extends CstNode {
  name: "stroke";
  children: StrokeCstChildren;
}

export type StrokeCstChildren = {
  Stroke: IToken[];
  HexColorLiteral: IToken[];
};

export interface StrokeWidthCstNode extends CstNode {
  name: "strokeWidth";
  children: StrokeWidthCstChildren;
}

export type StrokeWidthCstChildren = {
  StrokeWidth: IToken[];
  NumericLiteral: IToken[];
};

export interface DashedCstNode extends CstNode {
  name: "dashed";
  children: DashedCstChildren;
}

export type DashedCstChildren = {
  Dashed: IToken[];
  BooleanLiteral: IToken[];
};

export interface WidthCstNode extends CstNode {
  name: "width";
  children: WidthCstChildren;
}

export type WidthCstChildren = {
  Width: IToken[];
  NumericLiteral: IToken[];
};

export interface HeightCstNode extends CstNode {
  name: "height";
  children: HeightCstChildren;
}

export type HeightCstChildren = {
  Height: IToken[];
  NumericLiteral: IToken[];
};

export interface BackgroundCstNode extends CstNode {
  name: "background";
  children: BackgroundCstChildren;
}

export type BackgroundCstChildren = {
  Background: IToken[];
  HexColorLiteral: IToken[];
};

export interface FonSizeCstNode extends CstNode {
  name: "fonSize";
  children: FonSizeCstChildren;
}

export type FonSizeCstChildren = {
  FontSize: IToken[];
  NumericLiteral: IToken[];
};

export interface BorderCstNode extends CstNode {
  name: "border";
  children: BorderCstChildren;
}

export type BorderCstChildren = {
  Border: IToken[];
  Identifier: IToken[];
};

export interface OpacityCstNode extends CstNode {
  name: "opacity";
  children: OpacityCstChildren;
}

export type OpacityCstChildren = {
  Opacity: IToken[];
  NumericLiteral: IToken[];
};

export interface MetadataCstNode extends CstNode {
  name: "metadata";
  children: MetadataCstChildren;
}

export type MetadataCstChildren = {
  Metadata: IToken[];
  BooleanLiteral: IToken[];
};

export interface ThicknessCstNode extends CstNode {
  name: "thickness";
  children: ThicknessCstChildren;
}

export type ThicknessCstChildren = {
  Thickness: IToken[];
  NumericLiteral: IToken[];
};

export interface StyleCstNode extends CstNode {
  name: "style";
  children: StyleCstChildren;
}

export type StyleCstChildren = {
  Style: IToken[];
  Identifier: IToken[];
};

export interface RoutingCstNode extends CstNode {
  name: "routing";
  children: RoutingCstChildren;
}

export type RoutingCstChildren = {
  Routing: IToken[];
  Identifier: IToken[];
};

export interface PositionCstNode extends CstNode {
  name: "position";
  children: PositionCstChildren;
}

export type PositionCstChildren = {
  Position: IToken[];
  NumericLiteral: IToken[];
};

export interface ICstNodeVisitor<IN = any, OUT = any> extends ICstVisitor<IN, OUT> {
  workspace(children: WorkspaceCstChildren, param?: IN): OUT;
  model(children: ModelCstChildren, param?: IN): OUT;
  modelGroup(children: ModelGroupCstChildren, param?: IN): OUT;
  person(children: PersonCstChildren, param?: IN): OUT;
  softwareSystem(children: SoftwareSystemCstChildren, param?: IN): OUT;
  softwareSystemGroup(children: SoftwareSystemGroupCstChildren, param?: IN): OUT;
  container(children: ContainerCstChildren, param?: IN): OUT;
  containerGroup(children: ContainerGroupCstChildren, param?: IN): OUT;
  component(children: ComponentCstChildren, param?: IN): OUT;
  deploymentEnvironment(children: DeploymentEnvironmentCstChildren, param?: IN): OUT;
  deploymentNode(children: DeploymentNodeCstChildren, param?: IN): OUT;
  infrastructureNode(children: InfrastructureNodeCstChildren, param?: IN): OUT;
  softwareSystemInstance(children: SoftwareSystemInstanceCstChildren, param?: IN): OUT;
  containerInstance(children: ContainerInstanceCstChildren, param?: IN): OUT;
  relationship(children: RelationshipCstChildren, param?: IN): OUT;
  elementProperties(children: ElementPropertiesCstChildren, param?: IN): OUT;
  views(children: ViewsCstChildren, param?: IN): OUT;
  systemLandscapeView(children: SystemLandscapeViewCstChildren, param?: IN): OUT;
  systemContextView(children: SystemContextViewCstChildren, param?: IN): OUT;
  containerView(children: ContainerViewCstChildren, param?: IN): OUT;
  componentView(children: ComponentViewCstChildren, param?: IN): OUT;
  deploymentView(children: DeploymentViewCstChildren, param?: IN): OUT;
  viewProperties(children: ViewPropertiesCstChildren, param?: IN): OUT;
  nameProperty(children: NamePropertyCstChildren, param?: IN): OUT;
  technologyProperty(children: TechnologyPropertyCstChildren, param?: IN): OUT;
  descriptionProperty(children: DescriptionPropertyCstChildren, param?: IN): OUT;
  tagsProperty(children: TagsPropertyCstChildren, param?: IN): OUT;
  urlProperty(children: UrlPropertyCstChildren, param?: IN): OUT;
  propertiesProperty(children: PropertiesPropertyCstChildren, param?: IN): OUT;
  perspectivesProperty(children: PerspectivesPropertyCstChildren, param?: IN): OUT;
  includeProperty(children: IncludePropertyCstChildren, param?: IN): OUT;
  excludeProperty(children: ExcludePropertyCstChildren, param?: IN): OUT;
  autoLayoutProperty(children: AutoLayoutPropertyCstChildren, param?: IN): OUT;
  defaultProperty(children: DefaultPropertyCstChildren, param?: IN): OUT;
  animationProperty(children: AnimationPropertyCstChildren, param?: IN): OUT;
  titleProperty(children: TitlePropertyCstChildren, param?: IN): OUT;
  themesProperty(children: ThemesPropertyCstChildren, param?: IN): OUT;
  styles(children: StylesCstChildren, param?: IN): OUT;
  elementStyle(children: ElementStyleCstChildren, param?: IN): OUT;
  relationshipStyle(children: RelationshipStyleCstChildren, param?: IN): OUT;
  shape(children: ShapeCstChildren, param?: IN): OUT;
  icon(children: IconCstChildren, param?: IN): OUT;
  color(children: ColorCstChildren, param?: IN): OUT;
  stroke(children: StrokeCstChildren, param?: IN): OUT;
  strokeWidth(children: StrokeWidthCstChildren, param?: IN): OUT;
  dashed(children: DashedCstChildren, param?: IN): OUT;
  width(children: WidthCstChildren, param?: IN): OUT;
  height(children: HeightCstChildren, param?: IN): OUT;
  background(children: BackgroundCstChildren, param?: IN): OUT;
  fontSize(children: FonSizeCstChildren, param?: IN): OUT;
  border(children: BorderCstChildren, param?: IN): OUT;
  opacity(children: OpacityCstChildren, param?: IN): OUT;
  metadata(children: MetadataCstChildren, param?: IN): OUT;
  thickness(children: ThicknessCstChildren, param?: IN): OUT;
  style(children: StyleCstChildren, param?: IN): OUT;
  routing(children: RoutingCstChildren, param?: IN): OUT;
  position(children: PositionCstChildren, param?: IN): OUT;
}