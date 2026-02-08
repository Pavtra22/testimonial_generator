import React from 'react';
import Draggable from 'react-draggable';
import StarRating from './StarRating';
import { unitToPx } from '../utils/converters';

export default function PreviewCanvas({ canvasRef, config, template, size, setRating }) {
  const w = unitToPx(size.w, size.unit);
  const h = unitToPx(size.h, size.unit);

  const bgStyles = template.startsWith('data:image') 
    ? { backgroundImage: `url(${template})`, backgroundSize: 'cover' } 
    : {};

  const themes = {
    classic: "bg-white text-black border shadow-lg",
    dark: "bg-slate-900 text-white shadow-2xl",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl"
  };

  return (
    <div 
      ref={canvasRef}
      style={{ width: `${w}px`, height: `${h}px`, ...bgStyles }}
      className={`relative rounded-xl overflow-hidden flex flex-col items-center justify-center p-12 transition-all ${!template.startsWith('data') ? themes[template] : ''}`}
    >
      <Draggable bounds="parent">
        <div className="cursor-move z-20"><StarRating rating={config.rating} setRating={setRating} /></div>
      </Draggable>

      <Draggable bounds="parent">
        <p className="cursor-move text-center text-3xl font-serif italic my-10 z-20">"{config.review}"</p>
      </Draggable>

      <Draggable bounds="parent">
        <div className="cursor-move flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-20">
          <img src={config.image} className="w-16 h-16 rounded-full border-2 border-white shadow-md" alt="profile" />
          <div>
            <p className="font-black uppercase tracking-tight text-lg">{config.name}</p>
            <p className="opacity-80 text-sm font-medium">{config.role}</p>
          </div>
        </div>
      </Draggable>
    </div>
  );
}