interface SvgNode {
  id: number;
  name: string;
  x: number;
  y: number;
}

interface SvgLink {
  source: number;
  target: number;
}

interface SvgTreeViewProps {
  svgTreeData: { nodes: SvgNode[]; links: SvgLink[] };
  members: { id: number; generation?: number }[];
}

export function SvgTreeView({ svgTreeData, members }: SvgTreeViewProps) {
  // Calculate SVG dimensions based on content
  const maxGeneration = Math.max(...members.map((m) => m.generation ?? 1));
  const svgHeight = Math.max(600, (maxGeneration + 1) * 200);
  const svgWidth = Math.max(800, svgTreeData.nodes.length * 200);

  // Organize nodes by generation
  const nodesByGeneration = members.reduce((acc, member) => {
    const gen = member.generation ?? 1;
    if (!acc[gen]) acc[gen] = [];
    acc[gen].push(member);
    return acc;
  }, {} as Record<number, typeof members>);

  // Calculate node positions
  const positionedNodes = svgTreeData.nodes.map((node) => {
    const member = members.find((m) => m.id === node.id);
    const generation = member?.generation ?? 1;
    const nodesInGeneration = nodesByGeneration[generation]?.length ?? 1;
    const indexInGeneration =
      nodesByGeneration[generation]?.findIndex((m) => m.id === node.id) ?? 0;

    // Calculate x position based on generation and index
    const x = (indexInGeneration + 1) * (svgWidth / (nodesInGeneration + 1));
    // Calculate y position based on generation
    const y = generation * 200;

    return { ...node, x, y };
  });

  return (
    <div className="overflow-auto">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">
        Family Tree View
      </h2>
      <svg
        width={svgWidth}
        height={svgHeight}
        className="bg-white dark:bg-slate-800 rounded-lg"
        role="img"
        aria-labelledby="tree-title"
        aria-describedby="tree-desc"
      >
        <title id="tree-title">Khanal Family Tree</title>
        <desc id="tree-desc">
          A visual representation of the Khanal family tree, showing members and
          their relationships across generations.
        </desc>
        {/* Draw lines first (so they appear behind nodes) */}
        {svgTreeData.links.map((link, i) => {
          const sourceNode = positionedNodes.find((n) => n.id === link.source);
          const targetNode = positionedNodes.find((n) => n.id === link.target);
          if (!sourceNode || !targetNode) return null;

          // Calculate line coordinates for straight lines
          const startX = sourceNode.x;
          const startY = sourceNode.y + 100; // Bottom of source node
          const endX = targetNode.x;
          const endY = targetNode.y; // Top of target node

          return (
            <line
              key={i}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="hsl(12, 76%, 61%)"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          );
        })}
        {/* Draw nodes on top of lines */}
        {positionedNodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x - 75}, ${node.y})`}>
            <rect
              width="150"
              height="100"
              rx="8"
              fill="hsl(0, 0%, 100%)"
              className="dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700 transition-all duration-300 hover:shadow-lg"
            />
            <text
              x="75"
              y="30"
              textAnchor="middle"
              className="text-slate-800 dark:text-slate-100 font-semibold"
            >
              {node.name}
            </text>
            <text
              x="75"
              y="50"
              textAnchor="middle"
              className="text-slate-600 dark:text-slate-300 text-sm"
            >
              Gen {members.find((m) => m.id === node.id)?.generation}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
