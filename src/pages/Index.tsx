
import React, { useState, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { AnalysisResult, Disease } from '../components/AnalysisResult';
import { LoadingState } from '../components/LoadingState';
import { analyzeImage } from '../utils/imageUtils';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';

const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Disease | null>(null);
  const { toast } = useToast();
  
  const handleImageSelect = useCallback((file: File) => {
    setImage(file);
    setResult(null);
  }, []);
  
  const handleAnalyzeImage = useCallback(async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const analysis = await analyzeImage(image);
      setResult(analysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [image, toast]);
  
  const handleReset = useCallback(() => {
    setImage(null);
    setResult(null);
  }, []);

  return (
    <Layout>
      <section className="max-w-3xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
            Crop Disease Identification
          </div>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl mb-3">
            Identify crop diseases with precision
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload an image of your crop to instantly identify diseases, get detailed information, and receive treatment recommendations.
          </p>
        </div>
        
        <div className="space-y-8">
          {!image ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <ImagePreview image={image} onClear={handleReset} />
          )}
          
          {image && !isAnalyzing && !result && (
            <div className="flex justify-center animate-fade-in">
              <button 
                onClick={handleAnalyzeImage}
                className="btn-primary flex items-center gap-2"
              >
                Analyze Image
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {isAnalyzing && (
            <LoadingState />
          )}
          
          {result && (
            <div className="space-y-8">
              <AnalysisResult result={result} />
              
              <div className="flex justify-center animate-fade-in">
                <button 
                  onClick={handleReset}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
