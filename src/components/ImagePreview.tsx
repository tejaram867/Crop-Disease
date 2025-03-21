
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  image: File;
  onClear: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onClear }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);
  
  if (!imageUrl) return null;
  
  return (
    <div className="relative w-full animate-fade-in">
      <div className="glass-panel overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <img 
            src={imageUrl} 
            alt="Crop preview" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium truncate">{image.name}</p>
            <p className="text-xs text-muted-foreground">
              {(image.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button 
            onClick={onClear}
            className="rounded-full p-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
