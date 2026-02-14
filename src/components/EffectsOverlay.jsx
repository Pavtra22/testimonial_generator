import React, { useState, useEffect } from 'react';

export default function EffectsOverlay({ type }) {
  const [time, setTime] = useState(Date.now());

  // Force a re-render every frame to update particle positions
  useEffect(() => {
    let frame;
    const tick = () => {
      setTime(Date.now());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!type || type === 'none') return null;

  const particleCount = 25;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    seed: (i + 1) * 137.5, // Unique offset for each particle
    speed: 0.2 + (i % 5) * 0.1,
    left: (i * (100 / particleCount) + (i % 3)) % 100,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => {
        // Calculate vertical progress (0 to 1) based on time
        const duration = 4000 / p.speed;
        const progress = ((time + p.seed) % duration) / duration;
        
        // Effects Logic
        if (type === 'hearts') {
          return (
            <div 
              key={p.id} 
              className="absolute text-2xl"
              style={{
                left: `${p.left}%`,
                bottom: `${progress * 110 - 10}%`, // Moves from bottom to top
                opacity: 1 - progress,
                transform: `translateX(${Math.sin(progress * 10) * 20}px) scale(${0.5 + progress})`,
              }}
            >
              ❤️
            </div>
          );
        }

        if (type === 'confetti') {
          return (
            <div 
              key={p.id} 
              className="absolute w-3 h-3"
              style={{
                left: `${p.left}%`,
                top: `${progress * 110 - 10}%`, // Moves from top to bottom
                backgroundColor: ['#ff4d4d', '#4db8ff', '#4dff88', '#ffd11a', '#ff4dff'][p.id % 5],
                transform: `rotate(${progress * 720}deg)`,
                borderRadius: p.id % 2 === 0 ? '50%' : '0%'
              }}
            />
          );
        }

        if (type === 'bubbles') {
          return (
            <div 
              key={p.id} 
              className="absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px]"
              style={{
                left: `${p.left}%`,
                bottom: `${progress * 110 - 10}%`,
                width: `${20 + (p.id % 4) * 10}px`,
                height: `${20 + (p.id % 4) * 10}px`,
                opacity: 0.6 - (progress * 0.5),
              }}
            />
          );
        }

        if (type === 'rain') {
          return (
            <div 
              key={p.id} 
              className="absolute bg-blue-400/40 w-[2px] h-6"
              style={{
                left: `${p.left}%`,
                top: `${((progress * 2) % 1) * 110 - 10}%`,
                transform: `rotate(15deg)`,
              }}
            />
          );
        }

        if (type === 'snow') {
          return (
            <div 
              key={p.id} 
              className="absolute bg-white rounded-full opacity-80"
              style={{
                left: `${p.left}%`,
                top: `${progress * 110 - 10}%`,
                width: `${5 + (p.id % 5)}px`,
                height: `${5 + (p.id % 5)}px`,
                filter: 'blur(1px)',
              }}
            />
          );
        }

        if (type === 'glitter' || type === 'stars') {
            const sparkle = Math.sin(time / 200 + p.seed) > 0;
            return (
              <div 
                key={p.id} 
                className={`absolute bg-white rounded-full transition-opacity duration-300 ${sparkle ? 'opacity-100' : 'opacity-20'}`}
                style={{
                  left: `${p.left}%`,
                  top: `${(p.seed % 100)}%`,
                  width: '4px',
                  height: '4px',
                  boxShadow: '0 0 8px 2px white',
                }}
              />
            );
          }

        return null;
      })}
    </div>
  );
}