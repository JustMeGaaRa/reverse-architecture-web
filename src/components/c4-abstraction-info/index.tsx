import "./c4-abstraction-info.scss";

import { FC } from "react";

interface AbstractionInfoProps {
  type: string;
  title: string;
  technologies?: Array<string>;
  description?: string;
}

export const AbstractioInfo: FC<AbstractionInfoProps> = (props) => {
  const technologies = props.technologies
    ? props.technologies.join(", ")
    : new Array<string>();
  const technologyLine = props.technologies
    ? `[${props.type}: ${technologies}]`
    : `[${props.type}]`;

  return (
    <div className="c4-info">
      <strong className="c4-in-title">{props.title}</strong>
      <span className="c4-in-type">{technologyLine}</span>
      <p className="c4-in-description">{props.description}</p>
    </div>
  );
};
