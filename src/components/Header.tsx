
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex items-center justify-between px-6 md:px-12 animate-fade-in">
      <div className="flex flex-col items-center">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
            CropSeeker
          </h1>
        </Link>
        <p className="mt-1 text-sm font-light text-muted-foreground">
          Crop Disease Identification System
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
};
