import "./c4-scope.scss";

import { FC } from "react";

interface ScopeProps {
  type: string;
  title: string;
}

export const C4Scope: FC<ScopeProps> = (props) => {
  return (
    <div className="c4-scope">
      <div className="c4-sc-info">
        <div className="c4-sc-title">{props.title}</div>
        <div className="c4-sc-type">[{props.type}]</div>
      </div>
    </div>
  );
};
