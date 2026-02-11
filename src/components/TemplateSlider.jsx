import React from 'react';
import { Image, LayoutGrid, PaintBucket } from 'lucide-react';

export default function TemplateSlider({ currentTemplate, setTemplate }) {
  
  const templates = [
    // --- 1. CUSTOMIZABLE SOLID COLOR ---
    { 
      id: 'solid_custom', 
      label: 'Solid Color', 
      isSolid: true, // Triggers color picker logic
      style: { backgroundColor: '#ffffff' }, 
      textClass: 'text-slate-900' 
    },

    // --- 2. SOCIAL MEDIA GRADIENTS ---
    { 
      id: 'instagram', 
      label: 'Insta', 
      style: { background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }, 
      textClass: 'text-white' 
    },
    { 
      id: 'linkedin', 
      label: 'LinkedIn', 
      style: { background: 'linear-gradient(135deg, #0077b5 0%, #0e679c 100%)' }, 
      textClass: 'text-white' 
    },
    { 
      id: 'twitter_dark', 
      label: 'X Dark', 
      style: { backgroundColor: '#15202b' }, 
      textClass: 'text-white' 
    },
    { 
      id: 'midnight_blue', 
      label: 'Midnight', 
      style: { background: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)' }, 
      textClass: 'text-white' 
    },

    // --- 3. PATTERNS ---
    { 
      id: 'polka', 
      label: 'Polka', 
      style: { 
        backgroundColor: '#e5e5f7',
        backgroundImage: 'radial-gradient(#444cf7 1px, #e5e5f7 1px)',
        backgroundSize: '20px 20px'
      }, 
      textClass: 'text-slate-900' 
    },
    { 
      id: 'grid_paper', 
      label: 'Grid', 
      style: { 
        backgroundColor: '#fff',
        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }, 
      textClass: 'text-slate-900' 
    },
    { 
      id: 'stripes', 
      label: 'Stripes', 
      style: { 
        backgroundColor: '#f8fafc',
        backgroundImage: 'repeating-linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 75%, #e2e8f0 75%, #e2e8f0), repeating-linear-gradient(45deg, #e2e8f0 25%, #f8fafc 25%, #f8fafc 75%, #e2e8f0 75%, #e2e8f0)',
        backgroundPosition: '0 0, 10px 10px',
        backgroundSize: '20px 20px'
      }, 
      textClass: 'text-slate-900' 
    },
    { 
      id: 'checkered', 
      label: 'Checks', 
      style: { 
        backgroundColor: '#fff',
        backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee)',
        backgroundPosition: '0 0, 10px 10px',
        backgroundSize: '20px 20px'
      }, 
      textClass: 'text-slate-900' 
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplate({
          id: 'custom',
          label: 'Custom',
          style: { 
            backgroundImage: `url(${reader.result})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          },
          textClass: 'text-white' 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolidColorChange = (e) => {
    setTemplate({
      id: 'solid_custom',
      label: 'Solid Color',
      isSolid: true,
      style: { backgroundColor: e.target.value },
      textClass: 'text-slate-900'
    });
  };

  return (
    <div className="h-52 bg-white border-t p-6 flex flex-col gap-3 shadow-[0_-5px_30px_rgba(0,0,0,0.03)] z-30">
      <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
        <LayoutGrid size={14} /> Templates & Patterns
      </div>
      
      <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-4">
        {/* Upload Custom Background */}
        <label className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all bg-slate-50">
          <Image size={24} />
          <span className="text-[9px] font-bold uppercase mt-1">Upload</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>

        <div className="w-[1px] h-16 bg-slate-200 mx-1"></div>

        {/* Templates Loop */}
        {templates.map((tmpl) => (
          <button 
            key={tmpl.id} 
            onClick={() => setTemplate(tmpl)}
            className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 transition-all flex flex-col items-center justify-end p-2 shadow-sm overflow-hidden relative group
              ${currentTemplate.id === tmpl.id ? 'border-blue-600 ring-2 ring-blue-100 scale-105' : 'border-slate-200 hover:scale-105'} 
            `}
          >
            {/* Background Preview */}
            <div className="absolute inset-0 z-0" style={tmpl.style}></div>

            {/* Color Picker Overlay for Solid Custom */}
            {tmpl.isSolid && currentTemplate.id === 'solid_custom' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 backdrop-blur-[1px]">
                 <div className="bg-white rounded-full p-1.5 shadow-md">
                   <PaintBucket size={14} className="text-slate-700"/>
                 </div>
                 <input 
                    type="color" 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={handleSolidColorChange}
                 />
              </div>
            )}
            
            <span className="relative z-10 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-800 shadow-sm">
              {tmpl.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}