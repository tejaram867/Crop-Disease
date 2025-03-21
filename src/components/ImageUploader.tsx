
import React, { useCallback, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelect(e.target.files[0]);
    }
  }, [onImageSelect]);
  
  return (
    <div 
      className={`w-full h-64 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center px-4 py-6
        ${isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-border bg-secondary/50 hover:bg-secondary hover:border-muted-foreground/30'
        } 
        animate-scale-in cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        className="hidden" 
        id="file-upload" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
        <div className={`rounded-full p-3 mb-4 ${isDragging ? 'bg-primary/10' : 'bg-secondary'}`}>
          {isDragging ? (
            <Upload className="w-8 h-8 text-primary" />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-lg font-medium mb-2">Upload a crop image</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Drag and drop an image here, or click to select a file
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Supported formats: JPG, PNG, WEBP
        </p>
      </label>
    </div>
  );
};
