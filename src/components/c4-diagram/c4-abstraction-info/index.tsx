import "./c4-abstraction-info.scss";

import { FC } from "react";
import classnames from "classnames";
import { Abstraction } from "../../../interfaces";

interface AbstractionInfoProps {
  data: Abstraction;
  align: "left" | "center" | "right";
  showTechnologies?: boolean;
  showDescription?: boolean;
}

export const AbstractioInfo: FC<AbstractionInfoProps> = ({
  data,
  align,
  showTechnologies,
  showDescription
}) => {
  const infoClassses = classnames(
    "c4-abstraction-info",
    { left: align === "left" },
    { center: align === "center" },
    { right: align === "right" }
  );
  const technologyLine =
    data.technologies !== undefined && showTechnologies
      ? `[${data.type}: ${data.technologies.join(", ")}]`
      : `[${data.type}]`;

  return (
    <div className={infoClassses}>
      <strong className="c4-abs-title">{data.title}</strong>
      <span className="c4-abs-type">{technologyLine}</span>
      {data.description && showDescription && (
        <p className="c4-abs-description">{data.description}</p>
      )}
    </div>
  );
};
