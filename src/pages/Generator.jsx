import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { LayoutGrid } from 'lucide-react';
import EditorSidebar from '../components/EditorSidebar';
import PreviewCanvas from '../components/PreviewCanvas';
import ControlSidebar from '../components/ControlSidebar';
import TemplateSlider from '../components/TemplateSlider';
import { dummyTestimonials } from '../data/testimonials';

export default function Generator({ onSave, navigateToSaved }) {
  const [config, setConfig] = useState({ 
    ...dummyTestimonials[0], // Start with first dummy testimonial
    filename: "my-testimonial", 
    format: "PNG" 
  });
  const [template, setTemplate] = useState('gradient'); // Can be 'classic', 'dark', 'gradient' or a base64 image string
  const [size, setSize] = useState({ w: 1080, h: 1080, unit: 'px', locked: true });
  const canvasRef = useRef(null);
const handleSave = async () => {
  if (!canvasRef.current) return;
  try {
    const canvas = await html2canvas(canvasRef.current, {
      useCORS: true,
      scale: 2, // High resolution
      backgroundColor: null, // Captures theme/gradient
      logging: false,
      // Forces library to wait for all components to settle
      onclone: (clonedDoc) => {
        const clonedCanvas = clonedDoc.querySelector('.preview-canvas-root');
        if (clonedCanvas) clonedCanvas.style.transform = 'none'; 
      }
    });
    
    onSave({ 
      id: Date.now(), 
      image: canvas.toDataURL(`image/${config.format.toLowerCase()}`), 
      ...config 
    });
    alert("Testimonial saved to gallery!");
  } catch (error) {
    console.error("Capture Error:", error);
  }
};

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      {/* LEFT PANEL: Editor Controls */}
      <div className="w-80 bg-white border-r flex flex-col shadow-xl z-10">
        <div className="p-4 border-b">
          <button 
            onClick={navigateToSaved} 
            className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-all"
          >
            <LayoutGrid size={18}/> View Gallery
          </button>
        </div>
        <EditorSidebar config={config} setConfig={setConfig} />
      </div>

      {/* CENTER AREA: Canvas Preview & Templates */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex items-center justify-center p-10 overflow-auto bg-slate-200/50">
          <PreviewCanvas 
            canvasRef={canvasRef} 
            config={config} 
            template={template} 
            size={size} 
            setRating={(r) => setConfig({...config, rating: r})} 
          />
        </div>
        <TemplateSlider currentTemplate={template} setTemplate={setTemplate} />
      </div>

      {/* RIGHT PANEL: Size & Export Controls */}
      <ControlSidebar 
        size={size} 
        setSize={setSize} 
        config={config} 
        setConfig={setConfig} 
        onSave={handleSave} 
      />
    </div>
  );
}