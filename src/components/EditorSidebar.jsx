import React from 'react';
import { dummyTestimonials } from '../data/testimonials';
import { User, AlignLeft, Palette, ArrowLeftRight, Layout, Star, Heart, Zap, ThumbsUp } from 'lucide-react';

const FONTS = [
  { label: 'Modern Sans', value: 'font-sans' },
  { label: 'Elegant Serif', value: 'font-serif' },
  { label: 'Code Mono', value: 'font-mono' },
];

export default function EditorSidebar({ config, setConfig }) {
  
  const updateStyle = (section, key, value) => {
    setConfig({
      ...config,
      styles: {
        ...config.styles,
        [section]: {
          ...config.styles[section],
          [key]: value
        }
      }
    });
  };

  const updateCard = (key, value) => {
    setConfig({
      ...config,
      card: {
        ...config.card,
        [key]: value
      }
    });
  };

  const loadDummyData = (data) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      name: data.name,
      role: data.role,
      review: data.review,
      image: data.image,
      rating: data.rating
    }));
  };

  return (
    <aside className="flex-1 overflow-y-auto custom-scrollbar pb-10">
      
      {/* 1. Quick Load Profiles */}
      <section className="p-6 border-b bg-white">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <User size={14} /> Load Profile
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {dummyTestimonials.map((t) => (
            <button
              key={t.id}
              onClick={() => loadDummyData(t)}
              className={`flex flex-col items-center gap-2 p-2 rounded-lg border transition-all ${
                config.name === t.name 
                  ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
              <span className="text-[10px] font-bold text-center leading-tight truncate w-full">{t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Content Input */}
      <section className="p-6 border-b space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <AlignLeft size={14} /> Content
        </h3>
        <textarea
          value={config.review}
          onChange={(e) => setConfig({ ...config, review: e.target.value })}
          className="w-full p-3 bg-slate-50 border rounded-xl text-sm h-28 focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm"
          placeholder="Testimonial text..."
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="w-full p-3 bg-slate-50 border rounded-xl text-sm font-bold shadow-sm"
            placeholder="Name"
          />
          <input
            type="text"
            value={config.role}
            onChange={(e) => setConfig({ ...config, role: e.target.value })}
            className="w-full p-3 bg-slate-50 border rounded-xl text-sm shadow-sm"
            placeholder="Role"
          />
        </div>
      </section>

      {/* 3. NEW: Rating Icon Settings */}
      <section className="p-6 border-b space-y-4 bg-slate-50/30">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Star size={14} /> Rating Style
        </h3>
        <div className="flex gap-2">
           {/* Icon Selector */}
           <div className="flex bg-white border rounded-lg p-1 gap-1">
             {[
               { id: 'star', icon: Star },
               { id: 'heart', icon: Heart },
               { id: 'thumb', icon: ThumbsUp },
               { id: 'zap', icon: Zap }
             ].map((item) => (
               <button
                 key={item.id}
                 onClick={() => setConfig({ ...config, iconType: item.id })}
                 className={`p-2 rounded-md transition-all ${config.iconType === item.id ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
               >
                 <item.icon size={16} fill={config.iconType === item.id ? 'currentColor' : 'none'} />
               </button>
             ))}
           </div>

           {/* Icon Color Picker */}
           <div className="relative w-10 h-10 rounded-lg overflow-hidden border shadow-sm">
              <input 
                type="color" 
                value={config.iconColor || '#facc15'} 
                onChange={(e) => setConfig({ ...config, iconColor: e.target.value })}
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0" 
              />
           </div>
        </div>
      </section>

      {/* 4. Card Settings (Center Background) */}
      <section className="p-6 border-b bg-slate-50/50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Layout size={14} /> Center Card
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.card?.show || false} 
              onChange={(e) => updateCard('show', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        {config.card?.show && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
            {/* Color & Opacity */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Color & Opacity</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="color" 
                  className="w-10 h-10 rounded cursor-pointer border-0" 
                  onChange={(e) => {
                     // Simple hex update, keeps opacity at default high for now or needs complex parsing
                     updateCard('color', e.target.value); 
                  }}
                />
                {/* Simplified Opacity control - ideally parses rgba */}
                <input 
                  type="range" min="0" max="1" step="0.1"
                  defaultValue="0.9"
                  onChange={(e) => {
                    // This is a simplified way to just set rgba white with opacity for demo
                    // Real app would parse the current color hex to rgb first
                    updateCard('color', `rgba(255, 255, 255, ${e.target.value})`); 
                  }}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Padding & Radius */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Padding</label>
                 <input 
                  type="range" min="10" max="100" 
                  value={config.card?.padding || 40} 
                  onChange={(e) => updateCard('padding', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
               </div>
               <div>
                 <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Roundness</label>
                 <input 
                  type="range" min="0" max="60" 
                  value={config.card?.radius || 24} 
                  onChange={(e) => updateCard('radius', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
               </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Style & Typography */}
      <section className="p-6 space-y-8">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Palette size={14} /> Typography
        </h3>

        {/* Review Text Controls */}
        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border shadow-sm">
          <label className="text-xs font-bold text-slate-500 uppercase">Review Text</label>
          <div className="flex gap-2">
            <select 
              className="flex-1 p-2 bg-white border rounded-lg text-xs"
              value={config.styles?.review?.font}
              onChange={(e) => updateStyle('review', 'font', e.target.value)}
            >
              {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <div className="w-9 h-9 rounded-full overflow-hidden border ring-1 ring-slate-200 shadow-sm relative">
              <input type="color" className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0" value={config.styles?.review?.color} onChange={(e) => updateStyle('review', 'color', e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-slate-400 w-10">Size</span>
            <input 
              type="range" min="16" max="80" 
              value={config.styles?.review?.size || 32} 
              onChange={(e) => updateStyle('review', 'size', parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
             <span className="text-[10px] font-semibold text-slate-400 w-10 flex items-center gap-1"><ArrowLeftRight size={10}/> Wrap</span>
            <input 
              type="range" min="30" max="100" 
              value={config.styles?.review?.maxWidth || 100} 
              onChange={(e) => updateStyle('review', 'maxWidth', parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Name Controls */}
        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border shadow-sm">
          <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
          <div className="flex gap-2">
            <select 
              className="flex-1 p-2 bg-white border rounded-lg text-xs"
              value={config.styles?.name?.font}
              onChange={(e) => updateStyle('name', 'font', e.target.value)}
            >
              {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <div className="w-9 h-9 rounded-full overflow-hidden border ring-1 ring-slate-200 shadow-sm relative">
              <input type="color" className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0" value={config.styles?.name?.color} onChange={(e) => updateStyle('name', 'color', e.target.value)} />
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}