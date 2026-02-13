import React from 'react';

export default function EffectsOverlay({ type }) {
  if (!type || type === 'none') return null;

  const particles = Array.from({ length: 30 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* CONFETTI EFFECT */}
      {type === 'confetti' && (
        <div className="absolute inset-0">
          {particles.map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor: ['#ff4d4d', '#4db8ff', '#4dff88', '#ffd11a', '#ff4dff'][i % 5],
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
            />
          ))}
        </div>
      )}

      {/* HEARTS EFFECT */}
      {type === 'hearts' && (
        <div className="absolute inset-0">
          {particles.map((_, i) => (
            <div 
              key={i} 
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-30px`,
                animation: `floatUp ${4 + Math.random() * 4}s ease-in infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.8
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* GLITTER / STARS EFFECT */}
      {(type === 'glitter' || type === 'stars') && (
        <div className="absolute inset-0">
          {particles.map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
                animationDuration: `${1 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes fall {
          to { transform: translateY(110vh) rotate(720deg); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-110vh) translateX(${Math.random() * 100 - 50}px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}