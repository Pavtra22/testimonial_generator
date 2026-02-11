import React from 'react';
import { Star, Heart, ThumbsUp, Zap } from 'lucide-react';

export default function StarRating({ rating, setRating, iconType = 'star', color = '#facc15', editable = true }) {
  
  // Map string types to actual Lucide components
  const IconMap = {
    star: Star,
    heart: Heart,
    thumb: ThumbsUp,
    zap: Zap
  };

  const IconComponent = IconMap[iconType] || Star;

  return (
    <div className="flex gap-1 justify-center z-20">
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          onClick={() => editable && setRating(index)}
          disabled={!editable}
          className={`transition-transform duration-200 focus:outline-none ${
            editable ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-default"
          }`}
          type="button"
        >
          <IconComponent
            size={32}
            // Fill logic: If current index <= rating, fill it.
            fill={index <= rating ? color : "none"}
            // Stroke color: Always use the selected color
            color={color}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
}