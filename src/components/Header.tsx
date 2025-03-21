
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
          CropSeeker
        </h1>
        <p className="mt-1 text-sm font-light text-muted-foreground">
          Crop Disease Identification System
        </p>
      </div>
    </header>
  );
};
