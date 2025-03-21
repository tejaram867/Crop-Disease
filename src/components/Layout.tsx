
import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:px-8">
        {children}
      </main>
      <footer className="w-full py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CropSeeker. All rights reserved.</p>
      </footer>
    </div>
  );
};
