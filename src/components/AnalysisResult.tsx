import React from 'react';
import { AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Disease {
  name: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'nutritional' | 'healthy';
  confidence: number;
  description: string;
  treatment?: string;
}

interface AnalysisResultProps {
  result: Disease;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const navigate = useNavigate();
  
  const getTypeColor = (type: Disease['type']) => {
    switch (type) {
      case 'fungal':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'bacterial':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'viral':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'nutritional':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: Disease['type']) => {
    if (type === 'healthy') {
      return <CheckCircle className="w-5 h-5" />;
    } else {
      return <AlertTriangle className="w-5 h-5" />;
    }
  };
  
  const handleViewDetails = () => {
    navigate('/disease-info', { state: { disease: result } });
  };

  return (
    <div className="w-full animate-slide-up">
      <div className="glass-panel p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{result.name}</h2>
              <div className="flex items-center mt-2">
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)} flex items-center gap-1.5`}>
                  {getTypeIcon(result.type)}
                  <span>{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
                </div>
                <div className="ml-2 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary border border-border">
                  {Math.round(result.confidence * 100)}% confidence
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Description</span>
              </h3>
              <p className="text-sm leading-relaxed">{result.description}</p>
            </div>
            
            {result.treatment && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Treatment</span>
                </h3>
                <p className="text-sm leading-relaxed">{result.treatment}</p>
              </div>
            )}
            
            <div className="pt-2">
              <button
                onClick={handleViewDetails}
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View detailed information
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
