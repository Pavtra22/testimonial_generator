import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import StarRating from './StarRating';
import { unitToPx } from '../utils/converters';

export default function PreviewCanvas({ canvasRef, config, template, size, setRating }) {
  const w = unitToPx(size.w, size.unit);
  const h = unitToPx(size.h, size.unit);
  
  const starRatingRef = useRef(null);
  const reviewRef = useRef(null);
  const profileRef = useRef(null);

  const themeStyles = {
    classic: { backgroundColor: '#ffffff', color: '#0f172a', border: '2px solid #e2e8f0' },
    dark: { backgroundColor: '#020617', color: '#ffffff' },
    gradient: { background: 'linear-gradient(to bottom right, #4f46e5, #9333ea, #ec4899)', color: '#ffffff' }
  };

  const isCustomBg = template && template.startsWith('data:image');

  return (
    <div 
      ref={canvasRef}
      className="preview-canvas-root relative rounded-[40px] overflow-hidden flex flex-col items-center justify-center p-16 shadow-2xl transition-all"
      style={{ 
        width: `${w}px`, 
        height: `${h}px`,
        flexShrink: 0,
        ...(isCustomBg 
          ? { backgroundImage: `url(${template})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
          : (themeStyles[template] || themeStyles.gradient)
        )
      }}
    >
      <Draggable bounds="parent" nodeRef={starRatingRef}>
        <div ref={starRatingRef} className="cursor-move z-30 mb-8 filter drop-shadow-lg">
          <StarRating rating={config.rating} setRating={setRating} />
        </div>
      </Draggable>

      <Draggable bounds="parent" nodeRef={reviewRef}>
        <div ref={reviewRef} className="cursor-move z-20 w-full max-w-4xl px-8 mb-10">
          <p className="text-center text-5xl font-serif italic font-semibold leading-tight drop-shadow-md">
            "{config.review}"
          </p>
        </div>
      </Draggable>

      <Draggable bounds="parent" nodeRef={profileRef}>
        <div ref={profileRef} className="cursor-move flex items-center gap-6 bg-white/10 backdrop-blur-2xl p-8 rounded-[32px] border border-white/20 z-20 shadow-2xl">
          <img 
            src={config.image} 
            className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover" 
            alt="profile"
            crossOrigin="anonymous" 
          />
          <div className="text-left">
            <p className="font-black text-3xl uppercase tracking-tighter leading-none mb-2">
              {config.name}
            </p>
            <p className="text-sm font-mono font-black tracking-[0.2em] text-white/70 uppercase">
              {config.role}
            </p>
          </div>
        </div>
      </Draggable>
    </div>
  );
}