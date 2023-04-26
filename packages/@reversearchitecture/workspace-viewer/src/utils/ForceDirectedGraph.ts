type Node = {
    id: string;
    size: number;
};

type Edge = {
    source: string;
    target: string;
};

type Position = {
    x: number;
    y: number;
};
  
export function fdgd(nodes: Node[], edges: Edge[]): Map<string, Position> {
    const area = 10000;
    const k = Math.sqrt(area / nodes.length);
    const scaleFactor = 1;
    const maxIterations = 1000;
    const coolingFactor = 0.99;
    const minMovement = 0.001;
    const timeStep = 0.1;
  
    const nodePositions = new Map<string, Position>();
  
    // initialize random positions
    nodes.forEach((node) => {
        nodePositions.set(node.id, {
            x: Math.random() * area,
            y: Math.random() * area,
        });
    });
  
    let temperature = Math.sqrt(area) * timeStep;
  
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        const displacement: Map<string, Position> = new Map();

        nodes.forEach((node) => {
            displacement.set(node.id, { x: 0, y: 0 });
        });

        // calculate repulsive forces
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];

                const positionA = nodePositions.get(nodeA.id)!;
                const positionB = nodePositions.get(nodeB.id)!;

                const dx = positionA.x - positionB.x;
                const dy = positionA.y - positionB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const repulsiveForce = (k * k) / (distance * scaleFactor);

                const force = {
                    x: (dx / distance) * repulsiveForce,
                    y: (dy / distance) * repulsiveForce,
                };

                displacement.set(nodeA.id, {
                    x: displacement.get(nodeA.id)!.x + force.x,
                    y: displacement.get(nodeA.id)!.y + force.y,
                });

                displacement.set(nodeB.id, {
                    x: displacement.get(nodeB.id)!.x - force.x,
                    y: displacement.get(nodeB.id)!.y - force.y,
                });
            }
        }
  
        // Calculate attractive forces
        edges.forEach((edge) => {
            const sourceNode = nodes.find((node) => node.id === edge.source)!;
            const targetNode = nodes.find((node) => node.id === edge.target)!;

            const positionA = nodePositions.get(sourceNode.id)!;
            const positionB = nodePositions.get(targetNode.id)!;

            const dx = positionA.x - positionB.x;
            const dy = positionA.y - positionB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const attractiveForce = (distance * distance) / (k * scaleFactor);

            const force = {
                x: (dx / distance) * attractiveForce,
                y: (dy / distance) * attractiveForce,
            };

            displacement.set(sourceNode.id, {
                x: displacement.get(sourceNode.id)!.x - force.x,
                y: displacement.get(sourceNode.id)!.y - force.y,
            });

            displacement.set(targetNode.id, {
                x: displacement.get(targetNode.id)!.x + force.x,
                y: displacement.get(targetNode.id)!.y + force.y,
            });
        });

        // Update positions based on net forces
        let totalMovement = 0;
        nodes.forEach((node) => {
            const currentPosition = nodePositions.get(node.id)!;
            const disp = displacement.get(node.id)!;

            const distance = Math.sqrt(disp.x * disp.x + disp.y * disp.y);
            const movement = Math.min(distance, temperature);

            if (movement > minMovement) {
                totalMovement += movement;
            }

            const newPosition = {
                x: currentPosition.x + (disp.x / distance) * movement,
                y: currentPosition.y + (disp.y / distance) * movement,
            };

            nodePositions.set(node.id, newPosition);
        });

        // Cooling
        temperature *= coolingFactor;

        // Terminate if total movement is below the threshold
        if (totalMovement < minMovement) {
            break;
        }
    }

    return nodePositions;
}