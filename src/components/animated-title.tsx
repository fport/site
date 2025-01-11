'use client'

import { useState } from 'react'

export default function AnimatedTitle() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <h1 className="text-4xl font-medium">
      Furkan{" "}
      <span 
        className="relative inline-block cursor-pointer perspective-[1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span 
          className={`inline-block transition-all duration-300 transform-style-preserve-3d ${
            isHovered ? 'opacity-0 rotateX-90 origin-top' : 'opacity-100'
          }`}
        >
          Portakal
        </span>
        <span 
          className={`absolute left-0 transition-all duration-300 transform-style-preserve-3d ${
            isHovered ? 'opacity-100 rotateX-0' : 'opacity-0 -rotateX-90 origin-bottom'
          }`}
        >
          🍊
        </span>
      </span>
    </h1>
  )
} 