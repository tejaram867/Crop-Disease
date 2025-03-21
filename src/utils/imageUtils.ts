
import { Disease } from '../components/AnalysisResult';

// This is a mock function that simulates image analysis
// In a real application, this would call an API endpoint or use a machine learning model
export const analyzeImage = async (image: File): Promise<Disease> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Mock results - in a real app, this would be determined by ML analysis
      const diseases: Disease[] = [
        {
          name: "Late Blight",
          type: "fungal",
          confidence: 0.89,
          description: "Late blight is a devastating disease that affects potatoes and tomatoes. It's caused by the fungus-like oomycete pathogen Phytophthora infestans. The disease spreads quickly in cool, wet conditions and can destroy crops rapidly.",
          treatment: "Apply fungicides preventatively, use resistant varieties, ensure good air circulation, rotate crops, and remove infected plant debris."
        },
        {
          name: "Early Blight",
          type: "fungal",
          confidence: 0.76,
          description: "Early blight is a common fungal disease that affects tomatoes, potatoes, and other nightshade plants. It's caused by the fungus Alternaria solani and appears as dark spots with concentric rings on lower leaves first.",
          treatment: "Remove infected leaves, apply fungicides, maintain proper plant spacing for airflow, use mulch to prevent soil splash, and practice crop rotation."
        },
        {
          name: "Bacterial Spot",
          type: "bacterial",
          confidence: 0.82,
          description: "Bacterial spot is a serious disease affecting tomatoes and peppers. It's caused by Xanthomonas bacteria and appears as dark, water-soaked spots on leaves, stems, and fruits.",
          treatment: "Use copper-based bactericides, practice crop rotation, avoid overhead irrigation, remove infected plants, and use disease-free seeds and transplants."
        },
        {
          name: "Healthy Plant",
          type: "healthy",
          confidence: 0.95,
          description: "This plant appears healthy with no visible signs of disease or nutrient deficiency. The foliage shows good coloration and structure typical of a healthy specimen.",
          treatment: undefined
        }
      ];
      
      // Randomly select one of the mock diseases
      const randomIndex = Math.floor(Math.random() * diseases.length);
      resolve(diseases[randomIndex]);
    }, 2500); // 2.5 second delay to simulate processing
  });
};
