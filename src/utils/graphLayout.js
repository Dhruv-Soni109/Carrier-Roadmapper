import dagre from 'dagre';

const nodeWidth = 280;
const nodeHeight = 135;

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
    nodesep: isHorizontal ? 65 : 55,
    ranksep: isHorizontal ? 130 : 100,
    marginx: 60,
    marginy: 60
  });

  nodes.forEach((node) => {
    // Target nodes are wider and taller
    const width = node.data?.isTarget ? 320 : nodeWidth;
    const height = node.data?.isTarget ? 150 : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = node.data?.isTarget ? 320 : nodeWidth;
    const height = node.data?.isTarget ? 150 : nodeHeight;

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

