export function CNNVisualization() {
  const layers = [
    { nodes: 4, color: '#94a3b8' },
    { nodes: 6, color: '#64748b' },
    { nodes: 4, color: '#475569' },
    { nodes: 2, color: '#334155' },
  ];

  return (
    <div className="w-full h-48 flex items-center justify-center my-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <svg width="400" height="160" viewBox="0 0 400 160">
        {layers.map((layer, layerIndex) => (
          <g key={layerIndex} transform={`translate(${80 + layerIndex * 80}, 0)`}>
            {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
              const yPos = 80 - (layer.nodes * 25) / 2 + nodeIndex * 25;
              return (
                <g key={nodeIndex}>
                  <circle
                    cx="0"
                    cy={yPos}
                    r="8"
                    fill={layer.color}
                    className="drop-shadow-md"
                  />
                  {layerIndex < layers.length - 1 &&
                    Array.from({ length: layers[layerIndex + 1].nodes }).map(
                      (_, nextNodeIndex) => {
                        const nextYPos =
                          80 -
                          (layers[layerIndex + 1].nodes * 25) / 2 +
                          nextNodeIndex * 25;
                        return (
                          <line
                            key={`${nodeIndex}-${nextNodeIndex}`}
                            x1="8"
                            y1={yPos}
                            x2="72"
                            y2={nextYPos}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                            opacity="0.5"
                            className="dark:stroke-gray-600"
                          />
                        );
                      }
                    )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
