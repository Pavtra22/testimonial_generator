import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, setRating, editable = true }) {
  return (
    <div className="flex gap-1 justify-center z-20">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={24}
          fill={s <= rating ? "#fbbf24" : "none"}
          className={`${s <= rating ? "text-yellow-400" : "text-slate-300"} 
            ${editable ? "cursor-pointer hover:scale-110" : ""} transition-all`}
          onClick={() => editable && setRating(s)}
        />
      ))}
    </div>
  );
}