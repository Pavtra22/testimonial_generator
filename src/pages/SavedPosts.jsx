import React from 'react';
import { ArrowLeft, Download, Trash2, LayoutGrid } from 'lucide-react';

export default function SavedPosts({ savedPosts, setSavedPosts, navigateBack }) {
  const download = (post) => {
    const link = document.createElement('a');
    link.download = `${post.filename}.${post.format.toLowerCase()}`;
    link.href = post.image;
    link.click();
  };

  const remove = (id) => {
    setSavedPosts(savedPosts.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b p-4 px-8 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <button 
          onClick={navigateBack} 
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Editor
        </button>
        <div className="flex items-center gap-2 text-blue-600">
          <LayoutGrid size={20} />
          <h1 className="text-lg font-black uppercase tracking-tight">Your Saved Gallery</h1>
        </div>
        <div className="w-24"></div> {/* Spacer to balance header */}
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar">
        {savedPosts.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl p-6">
            <p className="text-lg font-medium">No saved designs yet.</p>
            <button 
              onClick={navigateBack} 
              className="mt-4 text-blue-600 font-bold underline hover:text-blue-700"
            >
              Go Create Your First Testimonial!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center p-4">
                  <img src={post.image} alt="testimonial preview" className="w-full h-full object-contain" />
                </div>
                <div className="p-5 flex items-center justify-between flex-grow">
                  <div>
                    <h4 className="font-bold text-gray-800 truncate w-36">{post.filename}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.format}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => remove(post.id)} 
                      className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Design"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => download(post)} 
                      className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-90 transition-all"
                      title="Download Design"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}