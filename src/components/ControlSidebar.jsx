import React from 'react';
import { Save, Lock, Unlock, Crop, Settings, FileText } from 'lucide-react';
import { unitToPx } from '../utils/converters'; // Ensure this path is correct

const PRESETS = {
  insta_post: { w: 1080, h: 1080, label: "Instagram Post (1:1)" },
  insta_story: { w: 1080, h: 1920, label: "Instagram Story (9:16)" },
  fb_post: { w: 1200, h: 630, label: "Facebook Post (1.91:1)" },
  x_post: { w: 1200, h: 675, label: "X (Twitter) Post (16:9)" },
  yt_thumb: { w: 1280, h: 720, label: "YouTube Thumbnail (16:9)" },
  pinterest_pin: { w: 1000, h: 1500, label: "Pinterest Pin (2:3)" }
};

export default function ControlSidebar({ size, setSize, config, setConfig, onSave }) {
  const updateDimension = (dim, value) => {
    const num = parseFloat(value) || 0;
    if (size.locked) {
      // If locked, maintain aspect ratio based on the changed dimension
      const aspectRatio = size.w / size.h;
      if (dim === 'w') {
        setSize({ ...size, w: num, h: num / aspectRatio });
      } else { // dim === 'h'
        setSize({ ...size, w: num * aspectRatio, h: num });
      }
    } else {
      setSize({ ...size, [dim]: num });
    }
  };

  const handlePreset = (e) => {
    const preset = PRESETS[e.target.value];
    if (preset) {
      setSize({ ...size, w: preset.w, h: preset.h, unit: 'px', locked: false });
    }
  };

  const currentPxWidth = Math.round(unitToPx(size.w, size.unit));
  const currentPxHeight = Math.round(unitToPx(size.h, size.unit));

  return (
    <aside className="w-80 bg-white border-l p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar shadow-sm">
      {/* Canvas Settings */}
      <section>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Settings size={14} /> Canvas Settings
        </h3>
        <div className="flex gap-2 mb-4">
          <select 
            value={size.unit} 
            onChange={(e) => setSize({...size, unit: e.target.value})}
            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="px">Pixels (px)</option>
            <option value="in">Inches (in)</option>
            <option value="cm">Centimeters (cm)</option>
          </select>
          <button 
            onClick={() => setSize({...size, locked: !size.locked})}
            className={`p-3 rounded-xl border transition-all ${size.locked ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
            title={size.locked ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"}
          >
            {size.locked ? <Lock size={18} /> : <Unlock size={18} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Width</label>
            <input 
              type="number" 
              value={Math.round(size.w)} // Round for display
              onChange={(e) => updateDimension('w', e.target.value)} 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Height</label>
            <input 
              type="number" 
              value={Math.round(size.h)} // Round for display
              onChange={(e) => updateDimension('h', e.target.value)} 
              disabled={size.locked} 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-50 disabled:bg-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
        <p className="mt-3 text-[10px] text-blue-500 font-mono text-center bg-blue-50 py-1 rounded">
          Output: {currentPxWidth} × {currentPxHeight} px
        </p>
      </section>

      <hr className="border-slate-200" />

      {/* Social Media Presets */}
      <section>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Crop size={14} /> Social Presets
        </h3>
        <select onChange={handlePreset} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="">Select Platform Size</option>
          {Object.entries(PRESETS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </section>

      <hr className="border-slate-200" />

      {/* Save Details */}
      <section className="flex-1 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <FileText size={14} /> Export Options
        </h3>
        <input 
          type="text" 
          value={config.filename} 
          onChange={(e) => setConfig({...config, filename: e.target.value})} 
          placeholder="Filename (e.g., testimonial-1)"
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
        />
        <select 
          value={config.format} 
          onChange={(e) => setConfig({...config, format: e.target.value})}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>PNG</option><option>JPEG</option><option>WEBP</option>
        </select>
      </section>

      {/* Save Button */}
      <button 
        onClick={onSave}
        className="mt-auto w-full py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95"
      >
        <Save size={20} />
        <span>SAVE TO GALLERY</span>
      </button>
    </aside>
  );
}