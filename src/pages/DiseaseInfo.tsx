
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Disease } from '../components/AnalysisResult';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../components/ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '../components/ui/card';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
import { ArrowLeft, Droplets, Thermometer, Sprout, AlertTriangle, Sun, Leaf } from 'lucide-react';

const DiseaseInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const diseaseData = location.state?.disease as Disease | undefined;

  // Redirect back to home if no disease data is present
  if (!diseaseData) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const getCropType = () => {
    if (diseaseData.name.toLowerCase().includes('tomato')) {
      return 'Tomato';
    } else if (diseaseData.name.toLowerCase().includes('potato')) {
      return 'Potato';
    } else if (diseaseData.name.toLowerCase().includes('pepper')) {
      return 'Pepper';
    } else {
      return 'Plant';
    }
  };

  const cropType = getCropType();

  // Get detailed symptoms based on disease type
  const getDetailedSymptoms = () => {
    switch (diseaseData.type) {
      case 'fungal':
        return [
          "Circular to irregular spots or lesions on leaves, often with concentric rings",
          "Yellow halos around lesions",
          "Browning and wilting of leaves, progressing from lower to upper leaves",
          "White, gray, or dark fuzzy growth on affected areas",
          "Stem lesions that may girdle the stem",
          "Fruit lesions with dark, sunken areas or water-soaked appearance"
        ];
      case 'bacterial':
        return [
          "Water-soaked spots that may appear greasy",
          "Small, dark lesions, sometimes with yellow halos",
          "Leaf spots that may coalesce and cause leaf blight",
          "Wilting despite adequate moisture",
          "Stem cankers or dark streaking inside stems",
          "Fruit spots that are raised, scabby, or have a bird's-eye appearance"
        ];
      case 'viral':
        return [
          "Mottling, mosaic patterns or yellowing on leaves",
          "Leaf curling, crinkling, or distortion",
          "Stunted growth and reduced yield",
          "Ring spots on fruits or leaves",
          "Unusual discoloration or patterns on leaves",
          "Systemic infection affecting the entire plant"
        ];
      case 'nutritional':
        return [
          "Interveinal chlorosis (yellowing between veins)",
          "Purple or reddish coloration on leaf undersides",
          "Necrotic (dead) spots on leaf margins or tips",
          "Stunted growth or poor development",
          "Distorted new growth or blossom end rot",
          "Overall paleness or unusual coloration"
        ];
      case 'healthy':
        return [
          "Vibrant, uniform green coloration",
          "Firm stems with appropriate thickness",
          "Leaves displaying normal shape, size, and orientation",
          "No signs of spots, lesions, or discoloration",
          "New growth appearing regularly and developing normally",
          "Overall plant vigor and appropriate size for its age"
        ];
      default:
        return ["No specific symptoms information available"];
    }
  };

  // Get causes based on disease type
  const getCauses = () => {
    switch (diseaseData.type) {
      case 'fungal':
        return [
          "Fungal spores spreading via wind, water, or insects",
          "Prolonged leaf wetness from rain, dew, or irrigation",
          "High humidity and poor air circulation",
          "Overcrowded plantings reducing airflow",
          "Infected plant debris from previous seasons",
          "Contaminated soil or garden tools"
        ];
      case 'bacterial':
        return [
          "Bacterial pathogens entering through wounds or natural openings",
          "Splashing water spreading bacteria between plants",
          "Infected seeds or transplants",
          "Insects acting as vectors for bacterial diseases",
          "High humidity and warm temperatures",
          "Working with plants when they're wet"
        ];
      case 'viral':
        return [
          "Transmission by insect vectors like aphids, thrips, or whiteflies",
          "Mechanical transmission through tools or handling",
          "Infected seeds or propagation material",
          "Pollen transfer in some viruses",
          "Nematodes in soil acting as vectors",
          "Vegetative propagation from infected plants"
        ];
      case 'nutritional':
        return [
          "Imbalanced soil pH affecting nutrient availability",
          "Insufficient or excessive fertilization",
          "Nutrient lockout due to soil conditions",
          "Poor soil drainage or compaction",
          "Competing plants or root damage",
          "Extreme temperatures affecting nutrient uptake"
        ];
      case 'healthy':
        return [
          "Balanced nutrition and appropriate fertilization",
          "Adequate sunlight and appropriate watering",
          "Good air circulation and proper spacing",
          "Well-draining soil with appropriate pH",
          "Regular monitoring and preventative care",
          "Suitable temperatures for the plant type"
        ];
      default:
        return ["No specific cause information available"];
    }
  };

  // Get optimal growth conditions based on crop type
  const getGrowthConditions = () => {
    switch (cropType.toLowerCase()) {
      case 'tomato':
        return {
          temperature: "Day: 21-29°C (70-85°F), Night: 15-17°C (60-65°F)",
          sunlight: "6-8 hours of direct sunlight daily",
          humidity: "65-75% relative humidity, lower during fruiting to prevent disease",
          soil: "Well-draining, slightly acidic soil (pH 6.0-6.8) with high organic matter",
          watering: "Consistent moisture, approximately 1-2 inches per week",
          spacing: "45-60 cm (18-24 inches) between plants, 90-120 cm (36-48 inches) between rows"
        };
      case 'potato':
        return {
          temperature: "Day: 18-24°C (65-75°F), avoid temperatures above 27°C (80°F)",
          sunlight: "Full sun, at least 6 hours daily",
          humidity: "60-70% relative humidity, lower during tuber development",
          soil: "Loose, well-draining soil with pH 5.8-6.5, rich in organic matter",
          watering: "2.5-5 cm (1-2 inches) of water per week, consistent moisture especially during tuber formation",
          spacing: "30-40 cm (12-16 inches) between plants, 70-90 cm (28-36 inches) between rows"
        };
      case 'pepper':
        return {
          temperature: "Day: 21-32°C (70-90°F), Night: 15-21°C (60-70°F)",
          sunlight: "6-8 hours of direct sunlight daily",
          humidity: "50-70% relative humidity",
          soil: "Well-draining, fertile soil with pH 6.0-6.8",
          watering: "Consistent moisture, about 2.5 cm (1 inch) per week",
          spacing: "45-60 cm (18-24 inches) between plants, 60-75 cm (24-30 inches) between rows"
        };
      default:
        return {
          temperature: "Day: 21-29°C (70-85°F), Night: 15-18°C (60-65°F)",
          sunlight: "6-8 hours of direct sunlight daily, depending on species",
          humidity: "50-70% relative humidity, varying by plant type",
          soil: "Well-draining soil with appropriate pH (usually 6.0-7.0) and organic matter",
          watering: "Consistent moisture based on plant needs, avoiding overwatering",
          spacing: "Appropriate spacing to ensure good air circulation"
        };
    }
  };

  const growthConditions = getGrowthConditions();
  const symptoms = getDetailedSymptoms();
  const causes = getCauses();

  // Get recommended precautions based on disease type
  const getPrecautions = () => {
    if (diseaseData.type === 'healthy') {
      return [
        "Maintain current growing practices",
        "Continue regular monitoring for early disease detection",
        "Practice crop rotation even with healthy plants",
        "Apply balanced fertilization based on soil tests",
        "Provide adequate spacing for air circulation",
        "Water at the base of plants to keep foliage dry"
      ];
    }

    switch (diseaseData.type) {
      case 'fungal':
        return [
          "Apply appropriate fungicides as preventative or early treatment",
          "Improve air circulation by proper spacing and pruning",
          "Water at the base of plants in the morning to reduce leaf wetness",
          "Remove and destroy infected plant parts",
          "Practice crop rotation, avoiding susceptible plants in the same location for 2-3 years",
          "Use disease-resistant varieties when available"
        ];
      case 'bacterial':
        return [
          "Remove and destroy infected plants to prevent spread",
          "Avoid working with plants when wet",
          "Disinfect tools regularly with 10% bleach solution or 70% alcohol",
          "Use copper-based bactericides as recommended",
          "Avoid overhead irrigation to prevent water splashing",
          "Practice crop rotation for at least 2-3 years"
        ];
      case 'viral':
        return [
          "Remove and destroy infected plants immediately",
          "Control insect vectors with appropriate insecticides or natural methods",
          "Wash hands and disinfect tools between handling plants",
          "Use virus-free seeds and certified disease-free transplants",
          "Control weeds that may harbor viruses",
          "Consider reflective mulches to repel insect vectors"
        ];
      case 'nutritional':
        return [
          "Conduct soil tests to determine specific deficiencies",
          "Amend soil with appropriate nutrients based on test results",
          "Adjust soil pH if needed to optimize nutrient availability",
          "Apply balanced fertilizers appropriate for the crop",
          "Consider foliar feeding for quick correction of deficiencies",
          "Improve soil structure with organic matter to enhance nutrient retention"
        ];
      default:
        return ["No specific precaution information available"];
    }
  };

  const precautions = getPrecautions();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{diseaseData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
            {diseaseData.name}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Analysis
          </button>
        </div>

        <Tabs defaultValue="symptoms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symptoms">Symptoms & Causes</TabsTrigger>
            <TabsTrigger value="precautions">Precautions</TabsTrigger>
            <TabsTrigger value="growth">Growth Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Symptoms
                  </CardTitle>
                  <CardDescription>
                    Visual indicators of {diseaseData.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-500" />
                    Causes
                  </CardTitle>
                  <CardDescription>
                    Factors contributing to {diseaseData.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {causes.map((cause, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="precautions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-green-500" />
                  Recommended Precautions
                </CardTitle>
                <CardDescription>
                  Steps to prevent or manage {diseaseData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    Climate Conditions
                  </CardTitle>
                  <CardDescription>
                    Optimal environment for {cropType} growth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-muted p-2 rounded-md shrink-0">
                        <Thermometer className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Temperature</h4>
                        <p className="text-sm text-muted-foreground">
                          {growthConditions.temperature}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-muted p-2 rounded-md shrink-0">
                        <Sun className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Sunlight</h4>
                        <p className="text-sm text-muted-foreground">
                          {growthConditions.sunlight}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-muted p-2 rounded-md shrink-0">
                        <Droplets className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Humidity</h4>
                        <p className="text-sm text-muted-foreground">
                          {growthConditions.humidity}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-green-500" />
                    Growing Requirements
                  </CardTitle>
                  <CardDescription>
                    Soil and care recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Soil Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        {growthConditions.soil}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Watering</h4>
                      <p className="text-sm text-muted-foreground">
                        {growthConditions.watering}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Spacing</h4>
                      <p className="text-sm text-muted-foreground">
                        {growthConditions.spacing}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DiseaseInfo;
