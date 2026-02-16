import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import RecordRTC from 'recordrtc';
import EditorSidebar from '../components/EditorSidebar';
import PreviewCanvas from '../components/PreviewCanvas';
import ControlSidebar from '../components/ControlSidebar';
import TemplateSlider from '../components/TemplateSlider';
import { dummyTestimonials } from '../data/testimonials';

export default function Generator() {
  const [config, setConfig] = useState({ 
    ...dummyTestimonials[0],
    filename: "testimonial-post", 
    format: "PNG",
    gifUrl:'',
    effectType: 'none',
    iconType: 'star', 
    iconColor: '#facc15',
    iconSize: 32,
    styles: {
      review: { font: 'font-serif', color: '#1e293b', size: 32, maxWidth: 100 }, 
      name: { font: 'font-sans', color: '#000000', size: 24, maxWidth: 100 }, 
      role: { font: 'font-mono', color: '#64748b', size: 14, maxWidth: 100 }   
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
    id: 'ocean_breeze', 
    label: 'Breeze', 
    style: { background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' }, 
    textClass: 'text-slate-900' 
  });
  
  const [size, setSize] = useState({ w: 1080, h: 1080, unit: 'px', locked: true });
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef(null);

  const handleDownload = async () => {
    const element = document.querySelector('.preview-canvas-root'); 
    if (!element || isDownloading) return;

    setIsDownloading(true);

    if (config.format === 'MP4') {
      try {
        const recordingCanvas = document.createElement('canvas');
        const scale = 1.5; // Slightly lower scale for faster processing
        recordingCanvas.width = element.offsetWidth * scale;
        recordingCanvas.height = element.offsetHeight * scale;
        const ctx = recordingCanvas.getContext('2d', { alpha: false });
        
        const stream = recordingCanvas.captureStream(30); 
        const recorder = new RecordRTC(stream, {
          type: 'video',
          mimeType: 'video/mp4',
          bitsPerSecond: 12800000
        });

        recorder.startRecording();
        const duration = 7000; 
        const startTime = Date.now();

        const captureFrame = async () => {
          const elapsed = Date.now() - startTime;
          
          if (elapsed < duration) {
            const tempCanvas = await html2canvas(element, { 
              scale:scale, 
              useCORS: true,
              allowTaint: false,
              backgroundColor: null, 
              logging: false 
            });

            // Draw background and then the captured frame
            ctx.fillStyle = "#ffffff"; 
            ctx.fillRect(0, 0, recordingCanvas.width, recordingCanvas.height);
            ctx.drawImage(tempCanvas, 0, 0);
            
            requestAnimationFrame(captureFrame);
          } else {
            recorder.stopRecording(() => {
              const blob = recorder.getBlob();
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `${config.filename || 'testimonial'}.mp4`;
              link.click();
              setIsDownloading(false);
            });
          }
        };

        await captureFrame();
      } catch (error) {
        console.error("Video Capture Error:", error);
        setIsDownloading(false);
      }
    } else {
      try {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const link = document.createElement('a');
        link.download = `${config.filename || 'testimonial'}.${config.format.toLowerCase()}`;
        link.href = canvas.toDataURL(`image/${config.format.toLowerCase()}`);
        link.click();
      } catch (e) {
        console.error(e);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden font-sans">
      <div className="w-96 bg-white border-r flex flex-col shadow-xl z-20">
        <div className="p-4 border-b bg-slate-50">
          <h1 className="text-xl font-black text-slate-800 tracking-tighter uppercase text-center">
            Testimonial <span className="text-blue-600">Generator</span>
          </h1>
        </div>
        <EditorSidebar config={config} setConfig={setConfig} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-200/50 relative">
        <div className="flex-1 flex items-center justify-center overflow-auto p-10">
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
        size={size} setSize={setSize} config={config} setConfig={setConfig} 
        onDownload={handleDownload} isDownloading={isDownloading} 
      />
    </div>
  );
}