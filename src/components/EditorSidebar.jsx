import React from 'react';
import { dummyTestimonials } from '../data/testimonials';
import { User, AlignLeft, Type } from 'lucide-react';

export default function EditorSidebar({ config, setConfig }) {
  return (
    <aside className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
      {/* Testimonial Selection */}
      <section>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <User size={14} /> Select Source
        </h3>
        <div className="flex flex-wrap gap-2">
          {dummyTestimonials.map((t) => (
            <button
              key={t.id}
              onClick={() => setConfig({ ...config, ...t })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                config.id === t.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </section>

      {/* Text Editing */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <AlignLeft size={14} /> Edit Content
        </h3>
        <div className="space-y-3">
          <textarea
            value={config.review}
            onChange={(e) => setConfig({ ...config, review: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Review text..."
          />
          <div className="relative">
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm pl-10"
              placeholder="Name"
            />
            <Type className="absolute left-3 top-3.5 text-gray-300" size={16} />
          </div>
          <input
            type="text"
            value={config.role}
            onChange={(e) => setConfig({ ...config, role: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            placeholder="Role"
          />
        </div>
      </section>
    </aside>
  );
}