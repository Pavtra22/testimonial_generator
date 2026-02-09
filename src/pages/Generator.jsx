import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import EditorSidebar from '../components/EditorSidebar';
import PreviewCanvas from '../components/PreviewCanvas';
import ControlSidebar from '../components/ControlSidebar';
import TemplateSlider from '../components/TemplateSlider';
import { dummyTestimonials } from '../data/testimonials';

export default function Generator() {
  const [config, setConfig] = useState({ 
    ...dummyTestimonials[0], // Starts with first dummy data entry
    filename: "my-testimonial", 
    format: "PNG" 
  });
  const [template, setTemplate] = useState('gradient');
  const [size, setSize] = useState({ w: 1080, h: 1080, unit: 'px', locked: true });
  const canvasRef = useRef(null);

  const handleDownload = async () => {
    // Select the root of the preview canvas for capture
    const element = document.querySelector('.preview-canvas-root'); 
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,           // Ensures profile images are captured
        allowTaint: true,
        scale: 3,                // High resolution for clear text and dummy data
        backgroundColor: null,   // Preserves the theme background/gradient
        width: element.offsetWidth,
        height: element.offsetHeight,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCanvas = clonedDoc.querySelector('.preview-canvas-root');
          if (clonedCanvas) {
            clonedCanvas.style.transform = 'none'; // Resets any browser-level scaling
          }
        }
      });

      // Generate download link
      const image = canvas.toDataURL(`image/${config.format.toLowerCase()}`, 1.0);
      const link = document.createElement('a');
      link.download = `${config.filename || 'testimonial'}.${config.format.toLowerCase()}`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Capture Error:", error);
      alert("Capture failed. Ensure images are fully loaded.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      {/* LEFT PANEL: Branding & Editor */}
      <div className="w-80 bg-white border-r flex flex-col shadow-xl z-10">
        <div className="p-4 border-b">
          <h1 className="text-xl font-black text-blue-600 tracking-tighter uppercase text-center py-2">
            Testimonial Pro
          </h1>
        </div>
        <EditorSidebar config={config} setConfig={setConfig} />
      </div>

      {/* CENTER AREA: Scrollable Canvas & Templates */}
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

      {/* RIGHT PANEL: Settings & Download */}
      <ControlSidebar 
        size={size} 
        setSize={setSize} 
        config={config} 
        setConfig={setConfig} 
        onDownload={handleDownload} 
      />
    </div>
  );
}