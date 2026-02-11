import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import EditorSidebar from '../components/EditorSidebar';
import PreviewCanvas from '../components/PreviewCanvas';
import ControlSidebar from '../components/ControlSidebar';
import TemplateSlider from '../components/TemplateSlider';
import { dummyTestimonials } from '../data/testimonials';

export default function Generator() {
  const [config, setConfig] = useState({ 
    ...dummyTestimonials[0],
    filename: "social-post", 
    format: "PNG",
    // NEW: Icon Settings
    iconType: 'star', // Options: 'star', 'heart', 'thumb', 'zap'
    iconColor: '#facc15', // Default Gold
    styles: {
      review: { font: 'font-serif', color: '#1e293b', size: 32, maxWidth: 100 }, 
      name: { font: 'font-sans', color: '#000000', size: 24 },
      role: { font: 'font-mono', color: '#64748b', size: 14 }
    },
    card: {
      show: true,
      color: 'rgba(255, 255, 255, 0.90)',
      padding: 40,
      radius: 24,
      border: false
    }
  });

  const [template, setTemplate] = useState({ 
    id: 'abstract_shapes', 
    label: 'Geometry', 
    layout: 'full', 
    style: { 
      backgroundImage: 'url("https://img.freepik.com/free-vector/gradient-geometric-shapes-background_23-2148429731.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff'
    } 
  });
  
  const [size, setSize] = useState({ w: 1080, h: 1080, unit: 'px', locked: true });
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef(null);

  const handleDownload = async () => {
    const element = document.querySelector('.preview-canvas-root'); 
    if (!element || isDownloading) return;

    setIsDownloading(true);

    try {
      // 1. Force a small wait to ensure images are ready
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(element, {
        useCORS: true,       // CRITICAL: Allows external images (Unsplash/Freepik)
        allowTaint: false,   // CRITICAL: Must be false to allow export
        scale: 2,            // High res
        backgroundColor: '#ffffff', // Fallback color
        logging: false,
        imageTimeout: 15000, // Wait longer for external images
        // Ensure background images are captured
        onclone: (clonedDoc) => {
          const bgLayer = clonedDoc.querySelector('.background-layer');
          if (bgLayer) {
             bgLayer.style.display = 'block'; // Ensure visibility
          }
        }
      });

      const image = canvas.toDataURL(`image/${config.format.toLowerCase()}`, 1.0);
      const link = document.createElement('a');
      link.download = `${config.filename || 'testimonial'}.${config.format.toLowerCase()}`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Capture Error:", error);
      alert("Capture failed. Try picking a different background or checking your internet connection.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      <div className="w-96 bg-white border-r flex flex-col shadow-xl z-20">
        <div className="p-4 border-b bg-slate-50">
          <h1 className="text-xl font-black text-slate-800 tracking-tighter uppercase text-center">
            Testimonial <span className="text-blue-600">Generator</span>
          </h1>
        </div>
        <EditorSidebar config={config} setConfig={setConfig} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-200/50">
        <div className="flex-1 flex items-center justify-center p-10 overflow-auto">
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

      <ControlSidebar 
        size={size} 
        setSize={setSize} 
        config={config} 
        setConfig={setConfig} 
        onDownload={handleDownload}
        isDownloading={isDownloading} 
      />
    </div>
  );
}