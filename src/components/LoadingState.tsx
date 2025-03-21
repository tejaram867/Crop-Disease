
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Analyzing image..."
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-2 border-muted opacity-20"></div>
      </div>
      <p className="text-lg font-medium">{message}</p>
      <div className="mt-4 flex space-x-1">
        <div className="h-2 w-2 rounded-full bg-primary/80 animate-pulse-slow"></div>
        <div className="h-2 w-2 rounded-full bg-primary/80 animate-pulse-slow delay-150"></div>
        <div className="h-2 w-2 rounded-full bg-primary/80 animate-pulse-slow delay-300"></div>
      </div>
    </div>
  );
};
