import "./App.css";

import { C4Diagram } from "../c4-diagram";
import Diagram from "../contracts/ContainerDiagram.json";

export default function App() {
  return (
    <div className="App">
      <C4Diagram diagram={Diagram} />
    </div>
  );
}
