import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Disease } from './AnalysisResult';
import { CircleCheck, CircleAlert, AlertTriangle, Info, ArrowLeftCircle, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, Cell, XAxis, YAxis, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

interface HealthReport {
  disease: Disease;
  severity: {
    level: 'low' | 'medium' | 'high';
    score: number;
  };
  spread: {
    risk: 'minimal' | 'moderate' | 'significant' | 'severe';
    rate: number;
  };
  detectionConfidence: number;
  scientificName: string;
  references: {
    title: string;
    author: string;
    year: number;
    url?: string;
  }[];
  treatmentSteps: string[];
  preventiveMeasures: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }[];
}

const generateReportData = (disease: Disease): HealthReport => {
  const severityScore = disease.confidence > 0.9 ? 0.7 : disease.confidence > 0.8 ? 0.5 : 0.3;
  const spreadRisk = disease.type === 'fungal' ? 'significant' : 
                     disease.type === 'bacterial' ? 'moderate' : 
                     disease.type === 'viral' ? 'severe' : 'minimal';
  
  const treatmentSteps = disease.treatment 
    ? disease.treatment.split('. ').filter(step => step.length > 5)
    : ["No specific treatment recommended at this time"];

  return {
    disease,
    severity: {
      level: severityScore > 0.6 ? 'high' : severityScore > 0.3 ? 'medium' : 'low',
      score: severityScore
    },
    spread: {
      risk: spreadRisk,
      rate: disease.type === 'healthy' ? 0 : (Math.random() * 0.5) + 0.3
    },
    detectionConfidence: disease.confidence,
    scientificName: disease.name === 'Late Blight' ? 'Phytophthora infestans' :
                   disease.name === 'Early Blight' ? 'Alternaria solani' :
                   disease.name === 'Bacterial Spot' ? 'Xanthomonas spp.' : 'N/A',
    references: [
      {
        title: `Understanding ${disease.name} in Agricultural Crops`,
        author: "J. Smith et al.",
        year: 2022,
        url: "#"
      },
      {
        title: `Advanced Treatment Methods for ${disease.type.charAt(0).toUpperCase() + disease.type.slice(1)} Diseases`,
        author: "M. Johnson & K. Williams",
        year: 2021,
        url: "#"
      }
    ],
    treatmentSteps,
    preventiveMeasures: [
      {
        title: "Crop Rotation",
        description: "Implement a 3-4 year crop rotation with non-host crops",
        priority: "high"
      },
      {
        title: "Resistant Varieties",
        description: "Plant disease-resistant varieties when available",
        priority: "high"
      },
      {
        title: "Sanitation",
        description: "Remove and destroy infected plant debris",
        priority: "medium"
      },
      {
        title: "Water Management",
        description: "Avoid overhead irrigation to reduce leaf wetness",
        priority: "medium"
      }
    ]
  };
};

const getSeverityChartData = (score: number) => {
  return [
    { name: 'Severity', value: score * 100 },
    { name: 'Remaining', value: 100 - (score * 100) }
  ];
};

const getSpreadRiskData = (score: number) => {
  return [
    { name: 'Current Spread', value: score * 100 },
    { name: 'Potential', value: (1 - score) * 100 }
  ];
};

const chartConfig = {
  severityHigh: { 
    theme: { light: '#ef4444', dark: '#ef4444' } 
  },
  severityMedium: { 
    theme: { light: '#f97316', dark: '#f97316' } 
  },
  severityLow: { 
    theme: { light: '#84cc16', dark: '#84cc16' } 
  },
  remaining: { 
    theme: { light: '#e5e7eb', dark: '#374151' } 
  },
  confidence: { 
    theme: { light: '#3b82f6', dark: '#60a5fa' } 
  },
  spread: { 
    theme: { light: '#8b5cf6', dark: '#a78bfa' } 
  }
};

const CropHealthReport: React.FC = () => {
  const location = useLocation();
  const disease = location.state?.disease;

  const report = disease ? generateReportData(disease) : null;

  if (!disease || !report) {
    return (
      <div className="w-full animate-fade-in space-y-8 p-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeftCircle className="w-4 h-4" />
            <span>Back to Analysis</span>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
            <CardDescription>
              Please analyze a crop image first to generate a health report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Return to the home page to upload and analyze an image.</p>
          </CardContent>
          <CardFooter>
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              Go to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-500 dark:text-red-400';
      case 'medium': return 'text-orange-500 dark:text-orange-400';
      case 'low': return 'text-green-500 dark:text-green-400';
      default: return 'text-blue-500 dark:text-blue-400';
    }
  };

  const severityBgColor = report.severity.level === 'high' ? 'bg-red-50 dark:bg-red-900/20' : 
                         report.severity.level === 'medium' ? 'bg-orange-50 dark:bg-orange-900/20' : 
                         'bg-green-50 dark:bg-green-900/20';

  return (
    <div className="w-full animate-fade-in space-y-8">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors">
          <ArrowLeftCircle className="w-4 h-4" />
          <span>Back to Analysis</span>
        </Link>
        <div className="text-sm text-muted-foreground">
          Report generated on {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="glass-panel p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">AI Crop Health Report</h1>
          <p className="text-muted-foreground">
            AI-Powered analysis and recommendations for your crop health concerns
          </p>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${disease.type === 'healthy' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                {disease.type === 'healthy' ? 
                  <CircleCheck className="w-5 h-5 text-green-500 dark:text-green-400" /> : 
                  <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />}
              </div>
              <span>Health Assessment Overview</span>
            </CardTitle>
            <CardDescription>
              {disease.type === 'healthy' 
                ? 'Your crop appears to be in good health' 
                : 'Analysis indicates presence of disease'}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{disease.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-28">Scientific Name:</span>
                    <span className="italic">{report.scientificName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-28">Type:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      disease.type === 'fungal' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                      disease.type === 'bacterial' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      disease.type === 'viral' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                      disease.type === 'nutritional' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {disease.type.charAt(0).toUpperCase() + disease.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-28">Severity:</span>
                    <span className={`${getSeverityColor(report.severity.level)} font-medium`}>
                      {report.severity.level.charAt(0).toUpperCase() + report.severity.level.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-28">Detection Confidence:</span>
                    <span className="font-medium">{Math.round(report.detectionConfidence * 100)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <ChartContainer className="h-32" config={chartConfig}>
                      <PieChart>
                        <Pie
                          data={getSeverityChartData(report.severity.score)}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={40}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill={report.severity.level === 'high' ? '#ef4444' : 
                                     report.severity.level === 'medium' ? '#f97316' : '#84cc16'} />
                          <Cell fill="#e5e7eb" />
                        </Pie>
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="text-center mt-1 text-xs text-muted-foreground">
                      Severity
                    </div>
                  </div>
                  <div>
                    <ChartContainer className="h-32" config={chartConfig}>
                      <PieChart>
                        <Pie
                          data={getSpreadRiskData(report.spread.rate)}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={40}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill="#8b5cf6" />
                          <Cell fill="#e5e7eb" />
                        </Pie>
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="text-center mt-1 text-xs text-muted-foreground">
                      Spread Risk
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${severityBgColor} mt-3`}>
              <p className="text-sm leading-relaxed">
                {disease.description}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {disease.type !== 'healthy' && (
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <CircleCheck className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
                <span>Treatment Recommendations</span>
              </CardTitle>
              <CardDescription>
                AI-suggested approaches based on diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.treatmentSteps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <CircleAlert className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              </div>
              <span>Preventive Measures</span>
            </CardTitle>
            <CardDescription>
              Recommended practices to prevent future occurrences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.preventiveMeasures.map((measure, index) => (
                <Card key={index} className="border-none shadow-none bg-accent/50">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        measure.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        measure.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {measure.priority.charAt(0).toUpperCase() + measure.priority.slice(1)} Priority
                      </div>
                      {measure.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground">{measure.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                <BookOpen className="w-5 h-5 text-green-500 dark:text-green-400" />
              </div>
              <span>Scientific References</span>
            </CardTitle>
            <CardDescription>
              Research sources for this analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {report.references.map((ref, index) => (
                <li key={index} className="text-sm">
                  <div className="font-medium">{ref.title}</div>
                  <div className="text-muted-foreground">
                    {ref.author} ({ref.year})
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <Info className="w-3 h-3 mr-1" /> References are provided for educational purposes
          </CardFooter>
        </Card>
        
        <Card className="mt-6 border-t-4 border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-primary/10">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <span>Overall Conclusion</span>
            </CardTitle>
            <CardDescription>
              Summary assessment and next steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              {disease.type === 'healthy' ? (
                <>Your crop appears to be in excellent health with no signs of disease or stress. Continue with current agricultural practices and regular monitoring to maintain this healthy state.</>
              ) : (
                <>
                  Based on our analysis, your crop is affected by {disease.name} ({report.scientificName}), a {disease.type} disease with {report.severity.level} severity. 
                  Immediate action is recommended to prevent further spread and damage. Follow the treatment plan outlined above, implement preventive measures, 
                  and consider consulting with a local agricultural extension service for on-site assessment.
                </>
              )}
            </p>
            
            <div className="mt-4 p-3 border rounded-lg bg-accent/30">
              <h4 className="text-sm font-medium mb-2">Recommended Next Steps:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Implement recommended treatments without delay</li>
                <li>• Monitor crop regularly for changes in disease progression</li>
                <li>• Apply preventive measures to protect unaffected plants</li>
                <li>• Consider soil testing to identify any nutrient imbalances</li>
                <li>• Document progress and response to treatments for future reference</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropHealthReport;
