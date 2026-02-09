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

  const themes = {
    classic: "bg-white text-slate-900 border-2 border-slate-200 shadow-xl",
    dark: "bg-slate-950 text-white shadow-2xl",
    gradient: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl"
  };

  return (
    <div 
      ref={canvasRef}
      style={{ width: `${w}px`, height: `${h}px` }}
      className={`preview-canvas-root relative rounded-3xl overflow-hidden flex flex-col items-center justify-center p-16 transition-all ${themes[template] || themes.gradient}`}
    >
      {/* 1. Styled Stars - Bright Yellow/Gold */}
      <Draggable bounds="parent" nodeRef={starRatingRef}>
        <div ref={starRatingRef} className="cursor-move z-20 mb-8 filter drop-shadow-lg">
          <StarRating rating={config.rating} setRating={setRating} />
        </div>
      </Draggable>

      {/* 2. Styled Review - Elegant Serif Font Style */}
      <Draggable bounds="parent" nodeRef={reviewRef}>
        <p ref={reviewRef} className="cursor-move text-center text-4xl font-serif italic font-semibold leading-snug px-6 z-20 drop-shadow-md">
          "{config.review}"
        </p>
      </Draggable>

      {/* 3. Styled Profile Card - Role and Name Colors */}
      <Draggable bounds="parent" nodeRef={profileRef}>
        <div ref={profileRef} className="cursor-move flex items-center gap-6 bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 z-20 shadow-2xl">
          <img 
            src={config.image} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover" 
            alt="profile" 
          />
          <div className="text-left">
            <p className="font-black text-2xl uppercase tracking-tighter leading-none mb-1">
              {config.name}
            </p>
            {/* Styled Role: Monospace font with distinctive color */}
            <p className="text-sm font-mono font-bold tracking-widest text-indigo-200 uppercase opacity-90">
              {config.role}
            </p>
          </div>
        </div>
      </Draggable>
    </div>
  );
}