'use client';

import { motion } from 'framer-motion';

export function CNNVisualization() {
  const layers = [
    { nodes: 4, color: '#94a3b8' },
    { nodes: 6, color: '#64748b' },
    { nodes: 4, color: '#475569' },
    { nodes: 2, color: '#334155' },
  ];

  return (
    <div className="w-full h-48 flex items-center justify-center my-6 bg-gray-50 rounded-lg p-4">
      <svg width="400" height="160" viewBox="0 0 400 160">
        {layers.map((layer, layerIndex) => (
          <g key={layerIndex} transform={`translate(${80 + layerIndex * 80}, 0)`}>
            {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
              const yPos = 80 - (layer.nodes * 25) / 2 + nodeIndex * 25;
              return (
                <motion.g
                  key={nodeIndex}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: layerIndex * 0.2 + nodeIndex * 0.1 }}
                >
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
                          <motion.line
                            key={`${nodeIndex}-${nextNodeIndex}`}
                            x1="8"
                            y1={yPos}
                            x2="72"
                            y2={nextYPos}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ delay: layerIndex * 0.3, duration: 0.5 }}
                          />
                        );
                      }
                    )}
                </motion.g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
} 