import React, { useState } from 'react';
import Generator from './pages/Generator';
import SavedPosts from './pages/SavedPosts';

export default function App() {
  const [page, setPage] = useState('generator');
  const [saved, setSaved] = useState([]);

  return (
    <div className="h-full w-full">
      {page === 'generator' ? 
        <Generator onSave={(p) => setSaved([p, ...saved])} navigateToSaved={() => setPage('saved')} /> : 
        <SavedPosts savedPosts={saved} navigateBack={() => setPage('generator')} />
      }
    </div>
  );
}