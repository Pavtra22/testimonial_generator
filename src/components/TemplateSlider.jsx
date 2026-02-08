import React from 'react';
import { Plus, Image } from 'lucide-react';

export default function TemplateSlider({ currentTemplate, setTemplate }) {
  const defaultThemes = [
    { id: 'classic', label: 'Classic', class: 'bg-white border text-slate-800' },
    { id: 'dark', label: 'Dark', class: 'bg-slate-900 text-white' },
    { id: 'gradient', label: 'Gradient', class: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplate(reader.result); // Set template to base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-44 bg-white border-t p-6 flex items-center gap-6 overflow-x-auto custom-scrollbar">
      {/* Upload Custom Background */}
      <label className="flex-shrink-0 w-32 h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all">
        <Image size={32} />
        <span className="text-[10px] font-bold uppercase mt-1">Upload BG</span>
        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
      </label>

      {/* Default Themes */}
      <div className="flex gap-4">
        {defaultThemes.map((theme) => (
          <button 
            key={theme.id} 
            onClick={() => setTemplate(theme.id)}
            className={`flex-shrink-0 w-32 h-32 rounded-xl border-4 transition-all flex items-center justify-center capitalize font-bold text-sm
              ${currentTemplate === theme.id ? 'border-blue-500 scale-105 shadow-md' : 'border-transparent hover:scale-105 hover:shadow'} 
              ${theme.class}`}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  );
}