import "./c4-block.scss";

import { FC } from "react";

interface C4BlockProps {
  backgroundColor: string;
}

export const C4Block: FC<C4BlockProps> = (props) => {
  const style = {
    backgroundColor: props.backgroundColor
  };

  return (
    <div className="c4-block" style={style}>
      {props.children}
    </div>
  );
};
