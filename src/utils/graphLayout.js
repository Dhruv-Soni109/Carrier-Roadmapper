import dagre from 'dagre';

const nodeWidth = 260;
const nodeHeight = 110;

/**
 * Calculates Dagre hierarchical layout for ReactFlow nodes and edges
 * @param {Array} nodes ReactFlow nodes
 * @param {Array} edges ReactFlow edges
 * @param {string} direction 'LR' (Left-to-Right) or 'TB' (Top-to-Bottom)
 */
export const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 45,
    ranksep: 90,
    marginx: 40,
    marginy: 40
  });

  nodes.forEach((node) => {
    // Target nodes are slightly wider
    const width = node.data?.isTarget ? 290 : nodeWidth;
    const height = node.data?.isTarget ? 130 : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = node.data?.isTarget ? 290 : nodeWidth;
    const height = node.data?.isTarget ? 130 : nodeHeight;

    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
