import React from 'react';
import { Image, Palette, LayoutTemplate } from 'lucide-react';

export default function TemplateSlider({ currentTemplate, setTemplate }) {
  
  const templates = [
    // --- 1. FRAMES (Requested: "Plain in centre") ---
    { 
      id: 'chat_pattern', 
      label: 'Chat Vibes', 
      layout: 'frame', 
      style: { 
        backgroundImage: 'url("https://img.freepik.com/free-vector/hand-drawn-business-communication-background_23-2147612140.jpg?w=1380&t=st=1707635000~exp=1707635600~hmac=e5e5e5")',
        backgroundSize: 'cover',
        backgroundColor: '#e0f2fe'
      } 
    },
    { 
      id: 'double_outline_frame', 
      label: 'Double Border', 
      layout: 'frame',
      frameStyle: 'double',
      style: { 
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      } 
    },
    { 
      id: 'modern_dark_frame', 
      label: 'Dark Mode', 
      layout: 'frame',
      darkFrame: true, // New property for dark inner cards
      style: { 
        backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
        backgroundSize: 'cover',
      } 
    },
    { 
      id: 'polaroid', 
      label: 'Polaroid', 
      layout: 'frame',
      frameStyle: 'bottom_heavy', // Style for polaroid look
      style: { 
        backgroundColor: '#d6d3d1',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")', 
      } 
    },

    // --- 2. FULL BACKGROUNDS (Patterns & Gradients) ---
    { 
      id: 'abstract_shapes', 
      label: 'Geometry', 
      layout: 'full',
      style: { 
        backgroundImage: 'url("https://img.freepik.com/free-vector/gradient-geometric-shapes-background_23-2148429731.jpg")',
        backgroundSize: 'cover',
        color: '#fff'
      } 
    },
    { 
      id: 'glass_blur', 
      label: 'Glass', 
      layout: 'full',
      style: { 
        backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        color: '#fff'
      } 
    },
    { 
      id: 'soft_gradient', 
      label: 'Soft Aura', 
      layout: 'full',
      style: { 
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        color: '#0f172a'
      } 
    },
    { 
      id: 'blueprint', 
      label: 'Blueprint', 
      layout: 'full',
      style: { 
        backgroundColor: '#1e293b',
        backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        color: '#94a3b8'
      } 
    },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplate({ 
          id: 'custom',
          layout: 'full',
          style: { 
            backgroundImage: `url(${reader.result})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-52 bg-white border-t p-6 flex flex-col gap-4 shadow-[0_-5px_30px_rgba(0,0,0,0.03)] z-30">
      <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
        <LayoutTemplate size={14} /> Template Gallery
      </div>
      
      <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-4">
        {/* Upload Button */}
        <label className="flex-shrink-0 w-28 h-28 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-all bg-slate-50 group">
          <Image size={28} className="group-hover:scale-110 transition-transform"/>
          <span className="text-[10px] font-bold uppercase mt-2">Upload BG</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>

        <div className="w-[1px] h-20 bg-slate-200 mx-1"></div>

        {/* Templates Loop */}
        {templates.map((t) => (
          <button 
            key={t.id} 
            onClick={() => setTemplate(t)}
            className={`flex-shrink-0 w-28 h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-end p-2 shadow-sm relative overflow-hidden group
              ${currentTemplate?.id === t.id ? 'border-blue-600 ring-2 ring-blue-100 scale-105' : 'border-slate-100 hover:border-blue-300 hover:scale-105'} 
            `}
          >
            {/* Thumbnail Preview */}
            <div className="absolute inset-0 z-0" style={t.style}></div>
            
            {/* Frame Indicator */}
            {t.layout === 'frame' && (
              <div className="absolute inset-4 border-2 border-dashed border-slate-400/50 bg-white/50 z-1 rounded-lg"></div>
            )}

            <div className="relative z-10 w-full">
              <span className="block w-full text-center text-[10px] font-bold bg-white/90 backdrop-blur-md text-slate-800 px-2 py-1 rounded-lg shadow-sm">
                {t.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}