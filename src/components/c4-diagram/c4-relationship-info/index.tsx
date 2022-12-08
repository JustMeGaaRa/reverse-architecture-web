import "./c4-relationship-info.scss";

import { FC } from "react";
import classnames from "classnames";
import { Relationship } from "../../../interfaces";

interface RelationshipInfoProps {
  data: Relationship;
  align: "left" | "center" | "right";
  showTitle?: boolean;
  showTechnologies?: boolean;
}

export const C4RelationshipInfo: FC<RelationshipInfoProps> = ({
  data,
  align,
  showTechnologies,
  showTitle
}) => {
  const infoClassses = classnames(
    "c4-relationship-info",
    { left: align === "left" },
    { center: align === "center" },
    { right: align === "right" }
  );

  return (
    <div className={infoClassses}>
      {data.title && showTitle && (
        <strong className="c4-rel-title">{data.title}</strong>
      )}
      {data.technologies && showTechnologies && (
        <div className="c4-rel-technologies">
          [{`${data.technologies.join(" / ")}`}]
        </div>
      )}
    </div>
  );
};
