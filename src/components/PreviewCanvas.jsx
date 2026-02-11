import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import StarRating from './StarRating';
import { unitToPx } from '../utils/converters';

export default function PreviewCanvas({ canvasRef, config, template, size, setRating }) {
  const w = unitToPx(size.w, size.unit);
  const h = unitToPx(size.h, size.unit);
  
  // Refs for draggable nodes
  const cardRef = useRef(null);

  // Default styles with safeguards
  const styles = config.styles || {
    review: { font: 'font-serif', color: '#000000', size: 32, maxWidth: 100 },
    name: { font: 'font-sans', color: '#000000', size: 24, maxWidth: 100 },
    role: { font: 'font-mono', color: '#64748b', size: 14, maxWidth: 100 }
  };

  const cardConfig = config.card || { show: false, color: 'white', padding: 40, radius: 24 };

  // Center Card Style
  // If card is shown, we style this container. If not, it's a transparent wrapper.
  const containerStyle = cardConfig.show ? {
    backgroundColor: cardConfig.color,
    borderRadius: `${cardConfig.radius}px`,
    padding: `${cardConfig.padding}px`,
    border: cardConfig.border ? '1px solid rgba(0,0,0,0.1)' : 'none',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    maxWidth: '85%',
    width: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'move', // Cursor indicates dragging
    backdropFilter: 'blur(8px)',
    position: 'relative'
  } : {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default'
  };

  return (
    <div 
      ref={canvasRef}
      className="preview-canvas-root relative overflow-hidden flex items-center justify-center shadow-2xl" 
      style={{ 
        width: `${w}px`, 
        height: `${h}px`,
        flexShrink: 0,
        backgroundColor: '#ffffff', // Base white
        // Fix for "overwritten" letters:
        letterSpacing: 'normal',
        fontVariant: 'normal',
        textRendering: 'auto' 
      }}
    >
      {/* BACKGROUND LAYER */}
      <div 
        className="background-layer absolute inset-0 -z-0"
        style={{
          width: '100%',
          height: '100%',
          ...template.style
        }}
      />

      {/* DRAGGABLE CONTENT CARD 
          We wrap the content in Draggable.
          This allows the user to move the text/card around the canvas.
      */}
      <Draggable bounds="parent" nodeRef={cardRef}>
        <div 
          ref={cardRef}
          className="relative z-10 transition-all duration-300"
          style={containerStyle}
        >
          {/* Rating Icons */}
          <div className="mb-6 hover:scale-105 transition-transform">
            <StarRating 
              rating={config.rating} 
              setRating={setRating}
              iconType={config.iconType}
              color={config.iconColor}
              size={config.iconSize} 
            />
          </div>

          {/* Review Text */}
          <div className="w-full flex justify-center mb-8">
            <p 
              className={`text-center italic font-semibold outline-none transition-all ${styles.review.font}`}
              style={{ 
                color: styles.review.color, 
                fontSize: `${styles.review.size}px`,
                maxWidth: `${styles.review.maxWidth}%`,
                lineHeight: 1.4, // Good line height prevents vertical overlap
                wordWrap: 'break-word'
              }}
            >
              "{config.review}"
            </p>
          </div>

          {/* Profile Section */}
          <div className={`flex items-center gap-4 p-3 pr-6 rounded-full border shadow-sm transition-all ${cardConfig.show ? 'bg-transparent border-transparent' : 'bg-white/20 backdrop-blur-sm border-white/40'}`}>
            <img 
              src={config.image} 
              className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover" 
              alt="profile"
              crossOrigin="anonymous" 
            />
            <div className="text-left">
              <p 
                className={`font-black uppercase tracking-tight leading-none mb-1 ${styles.name.font}`}
                style={{ 
                  color: styles.name.color, 
                  fontSize: `${styles.name.size}px`,
                  maxWidth: `${styles.name.maxWidth}%`,
                  lineHeight: 1.1
                }}
              >
                {config.name}
              </p>
              <p 
                className={`font-bold tracking-widest uppercase opacity-80 ${styles.role.font}`}
                style={{ 
                  color: styles.role.color, 
                  fontSize: `${styles.role.size}px`,
                  maxWidth: `${styles.role.maxWidth}%`,
                  lineHeight: 1.2
                }}
              >
                {config.role}
              </p>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}