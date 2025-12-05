import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Dna,
  Heart,
  Activity,
  Droplet,
  Brain,
  Zap,
  Eye,
  Download,
  RefreshCw,
  ChevronRight,
  FileCheck,
  Loader2,
  BarChart3,
  Beaker,
  Microscope,
  Flame,
  Info,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Progress } from '../ui/progress';

// Mock uploaded files with AI processing status
const uploadedFiles = [
  {
    id: 1,
    name: 'TruAge_Complete_Report_Nov2024.pdf',
    type: 'TruAge Epigenetic',
    uploadDate: '2024-11-15',
    status: 'processed',
    processingProgress: 100,
    aiStatus: 'completed',
    insights: 12,
    biomarkers: 28,
    fileSize: '2.4 MB',
    icon: Dna,
    color: 'bio',
  },
  {
    id: 2,
    name: 'Geneva_GI_Effects_Stool_Test.pdf',
    type: 'Geneva GI Effects',
    uploadDate: '2024-11-10',
    status: 'processed',
    processingProgress: 100,
    aiStatus: 'completed',
    insights: 18,
    biomarkers: 45,
    fileSize: '3.8 MB',
    icon: Microscope,
    color: 'solar',
  },
  {
    id: 3,
    name: 'Blood_Panel_Comprehensive_Oct2024.pdf',
    type: 'Blood Panel',
    uploadDate: '2024-10-28',
    status: 'processing',
    processingProgress: 67,
    aiStatus: 'analyzing',
    insights: 0,
    biomarkers: 0,
    fileSize: '1.9 MB',
    icon: Droplet,
    color: 'pulse',
  },
];

// TruAge specific biomarkers
const trueAgeData = {
  biologicalAge: 32.4,
  chronologicalAge: 38,
  ageingPace: 0.87, // <1 is aging slower
  dunedinPace: 0.89,
  organAging: [
    { organ: 'Brain', age: 28, status: 'optimal', delta: -10 },
    { organ: 'Heart', age: 31, status: 'optimal', delta: -7 },
    { organ: 'Liver', age: 35, status: 'good', delta: -3 },
    { organ: 'Immune System', age: 40, status: 'warning', delta: +2 },
    { organ: 'Kidneys', age: 33, status: 'optimal', delta: -5 },
  ],
  topMarkers: [
    { name: 'Telomere Length', value: '7.2 kb', status: 'optimal', percentile: 92 },
    { name: 'DNA Methylation Age', value: '32.4 years', status: 'optimal', percentile: 88 },
    { name: 'Inflammatory Age', value: '29.8 years', status: 'optimal', percentile: 95 },
  ],
};

// Geneva GI Effects data
const genevaGIData = {
  overallScore: 72,
  categories: [
    { name: 'Dysbiosis', status: 'moderate', findings: 4, color: 'solar' },
    { name: 'Inflammation', status: 'low', findings: 1, color: 'bio' },
    { name: 'Maldigestion', status: 'none', findings: 0, color: 'bio' },
    { name: 'Pathogens', status: 'detected', findings: 2, color: 'pulse' },
    { name: 'Metabolites', status: 'imbalanced', findings: 3, color: 'solar' },
  ],
  topFindings: [
    { 
      name: 'Akkermansia muciniphila', 
      status: 'low', 
      current: '2.1%', 
      optimal: '3-5%',
      impact: 'Reduced mucin production may affect gut barrier integrity',
      severity: 'moderate'
    },
    { 
      name: 'Faecalibacterium prausnitzii', 
      status: 'optimal', 
      current: '8.2%', 
      optimal: '5-15%',
      impact: 'Excellent anti-inflammatory bacteria production',
      severity: 'none'
    },
    { 
      name: 'H. pylori antigen', 
      status: 'detected', 
      current: 'Positive', 
      optimal: 'Negative',
      impact: 'May contribute to gastric inflammation and ulcer risk',
      severity: 'high'
    },
  ],
  recommendations: [
    'Increase prebiotic fiber intake (20-30g/day)',
    'Consider probiotic with Akkermansia strain',
    'Consult practitioner for H. pylori treatment protocol',
    'Add fermented foods to support diversity',
  ],
};

// Comprehensive biomarker list
const biomarkerCategories = [
  {
    name: 'Cardiovascular',
    icon: Heart,
    color: 'pulse',
    markers: [
      { name: 'Total Cholesterol', value: 182, unit: 'mg/dL', status: 'optimal', range: '< 200' },
      { name: 'LDL Cholesterol', value: 98, unit: 'mg/dL', status: 'optimal', range: '< 100' },
      { name: 'HDL Cholesterol', value: 68, unit: 'mg/dL', status: 'optimal', range: '> 60' },
      { name: 'Triglycerides', value: 82, unit: 'mg/dL', status: 'optimal', range: '< 150' },
      { name: 'ApoB', value: 72, unit: 'mg/dL', status: 'optimal', range: '< 80' },
      { name: 'Lp(a)', value: 18, unit: 'nmol/L', status: 'optimal', range: '< 75' },
    ],
  },
  {
    name: 'Metabolic',
    icon: Flame,
    color: 'solar',
    markers: [
      { name: 'Fasting Glucose', value: 88, unit: 'mg/dL', status: 'optimal', range: '70-99' },
      { name: 'HbA1c', value: 5.2, unit: '%', status: 'optimal', range: '< 5.7' },
      { name: 'Fasting Insulin', value: 4.2, unit: 'μIU/mL', status: 'optimal', range: '2-6' },
      { name: 'HOMA-IR', value: 0.9, unit: '', status: 'optimal', range: '< 1.0' },
    ],
  },
  {
    name: 'Inflammation',
    icon: Activity,
    color: 'electric',
    markers: [
      { name: 'hs-CRP', value: 0.4, unit: 'mg/L', status: 'optimal', range: '< 1.0' },
      { name: 'ESR', value: 6, unit: 'mm/hr', status: 'optimal', range: '< 10' },
      { name: 'IL-6', value: 1.8, unit: 'pg/mL', status: 'optimal', range: '< 3.0' },
    ],
  },
  {
    name: 'Hormones',
    icon: Zap,
    color: 'neural',
    markers: [
      { name: 'Total Testosterone', value: 680, unit: 'ng/dL', status: 'optimal', range: '300-1000' },
      { name: 'Free Testosterone', value: 18.2, unit: 'pg/mL', status: 'optimal', range: '9-30' },
      { name: 'Cortisol (AM)', value: 14.5, unit: 'μg/dL', status: 'optimal', range: '10-20' },
      { name: 'DHEA-S', value: 285, unit: 'μg/dL', status: 'optimal', range: '200-500' },
      { name: 'Vitamin D', value: 62, unit: 'ng/mL', status: 'optimal', range: '50-80' },
    ],
  },
];

export default function ProtocolsView() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<typeof uploadedFiles[0] | null>(null);
  const [showAIProcessing, setShowAIProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate upload
    simulateUpload();
  };

  const handleFileSelect = () => {
    // Simulate file selection
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowAIProcessing(true);
          setTimeout(() => setShowAIProcessing(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle2 className="w-5 h-5 text-bio" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-electric animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-steel" />;
    }
  };

  const getBiomarkerTrend = (status: string) => {
    switch (status) {
      case 'optimal':
        return { icon: CheckCircle2, color: 'text-bio', bg: 'bg-bio/10' };
      case 'good':
        return { icon: Minus, color: 'text-electric', bg: 'bg-electric/10' };
      case 'warning':
        return { icon: AlertCircle, color: 'text-solar', bg: 'bg-solar/10' };
      default:
        return { icon: AlertCircle, color: 'text-pulse', bg: 'bg-pulse/10' };
    }
  };

  return (
    <div className="min-h-screen mesh-gradient py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="tag text-steel mb-3">LAB RESULTS & BIOMARKERS</div>
            <h2 className="mb-4">Health Data Intelligence</h2>
            <p className="text-xl text-steel max-w-2xl">
              Upload lab results for dual-engine AI analysis (OpenBioLLM + Google Gemini)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <motion.div
          className={`neo-card p-12 border-2 border-dashed transition-all cursor-pointer ${
            isDragging ? 'border-electric bg-electric/5 scale-[1.02]' : 'border-cloud hover:border-steel'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileSelect}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl gradient-electric mx-auto mb-6 flex items-center justify-center">
              <Upload className="w-10 h-10 text-void" />
            </div>
            <h3 className="mb-3">Upload Lab Results</h3>
            <p className="text-steel mb-6 max-w-md mx-auto">
              Drop PDF files here or click to browse. Supports TruAge, Geneva GI Effects, blood panels, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['TruAge PDF', 'Geneva GI', 'Blood Panel', 'Hormone Panel', 'Metabolic Panel'].map((type) => (
                <span key={type} className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-ink border border-cloud">
                  {type}
                </span>
              ))}
            </div>
            <Button size="lg" className="gradient-electric text-void">
              <Upload className="w-5 h-5 mr-2" />
              Select Files
            </Button>
          </div>
        </motion.div>

        {/* Upload Progress */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              className="neo-card-electric p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Loader2 className="w-6 h-6 text-electric animate-spin" />
                <div className="flex-1">
                  <p className="font-semibold text-ink mb-1">Uploading file...</p>
                  <p className="text-sm text-steel">Processing and extracting data</p>
                </div>
                <span className="text-2xl font-bold text-electric">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Processing Animation */}
        <AnimatePresence>
          {showAIProcessing && (
            <motion.div
              className="neo-card-neural p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl gradient-neural flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-void" />
                  </div>
                  <div className="absolute inset-0 rounded-xl gradient-neural animate-ping opacity-20" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-2">AI Analysis in Progress</h4>
                  <p className="text-steel mb-4">
                    Dual-engine cross-checking (OpenBioLLM + Google Gemini) extracting biomarkers, 
                    identifying patterns, and generating personalized insights...
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-bio animate-pulse" />
                      <span className="text-sm text-steel">Parsing PDF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                      <span className="text-sm text-steel">Extracting markers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-neural animate-pulse" />
                      <span className="text-sm text-steel">Generating insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <Tabs defaultValue="files" className="w-full">
          <TabsList className="grid w-full grid-cols-4 neo-card p-1">
            <TabsTrigger value="files">Uploaded Files</TabsTrigger>
            <TabsTrigger value="biomarkers">All Biomarkers</TabsTrigger>
            <TabsTrigger value="trueage">TruAge Analysis</TabsTrigger>
            <TabsTrigger value="gi">GI Microbiome</TabsTrigger>
          </TabsList>

          {/* Uploaded Files Tab */}
          <TabsContent value="files" className="mt-8 space-y-4">
            {uploadedFiles.map((file, idx) => {
              const Icon = file.icon;
              return (
                <motion.div
                  key={file.id}
                  className={`neo-card-${file.color} p-6 cursor-pointer hover:scale-[1.01] transition-transform`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl gradient-${file.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-void" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4>{file.name}</h4>
                        {getStatusIcon(file.status)}
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`tag text-${file.color} bg-${file.color}/20`}>{file.type}</span>
                        <span className="text-sm text-steel">Uploaded {file.uploadDate}</span>
                        <span className="text-sm text-steel">{file.fileSize}</span>
                      </div>

                      {file.status === 'processing' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-steel">AI Processing</span>
                            <span className="text-sm font-bold text-electric">{file.processingProgress}%</span>
                          </div>
                          <Progress value={file.processingProgress} className="h-2" />
                        </div>
                      )}

                      {file.status === 'processed' && (
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 rounded-xl bg-white/50 border border-cloud">
                            <p className="text-xs text-steel mb-1">AI Insights</p>
                            <p className="text-xl font-bold text-ink">{file.insights}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white/50 border border-cloud">
                            <p className="text-xs text-steel mb-1">Biomarkers</p>
                            <p className="text-xl font-bold text-ink">{file.biomarkers}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white/50 border border-cloud">
                            <p className="text-xs text-steel mb-1">Status</p>
                            <Badge variant="success" className="mt-1">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">
                        View Report
                        <Eye className="w-4 h-4 ml-2" />
                      </Button>
                      {file.status === 'processed' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </TabsContent>

          {/* All Biomarkers Tab */}
          <TabsContent value="biomarkers" className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {biomarkerCategories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    className={`neo-card-${category.color} p-6`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl gradient-${category.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-void" />
                      </div>
                      <div>
                        <h3>{category.name}</h3>
                        <p className="text-sm text-steel">{category.markers.length} markers tracked</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.markers.map((marker) => {
                        const statusInfo = getBiomarkerTrend(marker.status);
                        const StatusIcon = statusInfo.icon;
                        
                        return (
                          <div key={marker.name} className="p-4 rounded-xl bg-white/50 border border-cloud">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-ink">{marker.name}</span>
                              <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-2xl font-bold text-ink">{marker.value}</span>
                              <span className="text-sm text-steel">{marker.unit}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-steel">Optimal: {marker.range}</span>
                              <span className={`tag ${statusInfo.bg} ${statusInfo.color} text-xs px-2 py-1`}>
                                {marker.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* TruAge Analysis Tab */}
          <TabsContent value="trueage" className="mt-8 space-y-6">
            {/* Biological Age Hero */}
            <div className="neo-card-bio p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full gradient-bio blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="tag text-steel mb-6">BIOLOGICAL AGE</div>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div>
                    <div className="text-7xl font-bold gradient-text-bio mb-2">
                      {trueAgeData.biologicalAge}
                    </div>
                    <p className="text-steel">Biological Age</p>
                  </div>
                  <div className="w-px h-24 bg-cloud" />
                  <div>
                    <div className="text-7xl font-bold text-steel mb-2">
                      {trueAgeData.chronologicalAge}
                    </div>
                    <p className="text-steel">Chronological Age</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full neo-card-bio">
                  <TrendingDown className="w-6 h-6 text-bio" />
                  <span className="text-2xl font-bold text-bio">
                    -{(trueAgeData.chronologicalAge - trueAgeData.biologicalAge).toFixed(1)} years younger
                  </span>
                </div>
                <p className="text-steel mt-6 max-w-2xl mx-auto">
                  Your epigenetic age is <span className="font-bold text-bio">{(trueAgeData.chronologicalAge - trueAgeData.biologicalAge).toFixed(1)} years</span> below your chronological age. 
                  You're aging at <span className="font-bold text-bio">{(trueAgeData.ageingPace * 100).toFixed(0)}%</span> of the expected rate.
                </p>
              </div>
            </div>

            {/* Organ-Specific Aging */}
            <div className="neo-card p-8">
              <h3 className="mb-6">Organ-Specific Biological Age</h3>
              <div className="space-y-4">
                {trueAgeData.organAging.map((organ) => {
                  const statusColor = organ.status === 'optimal' ? 'bio' : organ.status === 'good' ? 'electric' : 'solar';
                  const deltaColor = organ.delta < 0 ? 'text-bio' : 'text-solar';
                  
                  return (
                    <div key={organ.organ} className="p-4 rounded-xl bg-pearl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${statusColor}`} />
                          <span className="font-semibold text-ink">{organ.organ}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-ink">{organ.age} years</span>
                          <span className={`text-sm font-bold ${deltaColor}`}>
                            {organ.delta > 0 ? '+' : ''}{organ.delta} years
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-2 bg-white rounded-full overflow-hidden">
                        <div 
                          className={`gradient-${statusColor} h-2 rounded-full`}
                          style={{ width: `${((trueAgeData.chronologicalAge - Math.abs(organ.delta)) / trueAgeData.chronologicalAge) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Markers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trueAgeData.topMarkers.map((marker, idx) => (
                <div key={marker.name} className="neo-card-electric p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Dna className="w-8 h-8 text-electric" />
                    <Badge className="bg-bio/20 text-bio">
                      {marker.percentile}th percentile
                    </Badge>
                  </div>
                  <h4 className="mb-2">{marker.name}</h4>
                  <div className="text-3xl font-bold text-ink mb-1">{marker.value}</div>
                  <p className="text-sm text-steel">Optimal range for longevity</p>
                </div>
              ))}
            </div>

            {/* AI Recommendations */}
            <div className="neo-card-neural p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-neural flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-void" />
                </div>
                <div className="flex-1">
                  <div className="tag text-neural mb-3">AI RECOMMENDATIONS • DUAL ENGINE</div>
                  <h4 className="mb-4">Personalized Longevity Protocol</h4>
                  <p className="text-steel mb-6">
                    Based on your TruAge results, our dual-engine AI (OpenBioLLM + Google Gemini) has identified 
                    key intervention opportunities to further optimize your biological age trajectory.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-neural/5 border border-neural/20">
                      <h5 className="text-sm mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-neural" />
                        Immune System Focus
                      </h5>
                      <p className="text-sm text-steel">
                        Your immune age is slightly elevated. Consider adding zinc, vitamin C, and regular sauna exposure.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-bio/5 border border-bio/20">
                      <h5 className="text-sm mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-bio" />
                        Maintain Cardiovascular Youth
                      </h5>
                      <p className="text-sm text-steel">
                        Excellent heart age. Continue Zone 2 training and omega-3 supplementation to preserve this advantage.
                      </p>
                    </div>
                  </div>
                  <Button className="gradient-neural text-void">
                    Generate Full Protocol
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* GI Microbiome Tab */}
          <TabsContent value="gi" className="mt-8 space-y-6">
            {/* Overall Score */}
            <div className="neo-card-solar p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="tag text-steel mb-2">GUT HEALTH SCORE</div>
                  <h2>Geneva GI Effects Analysis</h2>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold gradient-text-solar mb-2">
                    {genevaGIData.overallScore}
                  </div>
                  <p className="text-steel">/ 100</p>
                </div>
              </div>
              <p className="text-steel">
                Comprehensive stool analysis with PCR, cultures, and microscopy across 5 key diagnostic categories.
              </p>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {genevaGIData.categories.map((cat, idx) => {
                const statusColors = {
                  low: 'bio',
                  none: 'bio',
                  moderate: 'solar',
                  detected: 'pulse',
                  imbalanced: 'solar',
                };
                const color = statusColors[cat.status as keyof typeof statusColors];
                
                return (
                  <motion.div
                    key={cat.name}
                    className={`neo-card-${color} p-4 text-center`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Microscope className={`w-8 h-8 text-${color} mx-auto mb-3`} />
                    <h4 className="text-sm mb-2">{cat.name}</h4>
                    <div className="text-2xl font-bold text-ink mb-1">{cat.findings}</div>
                    <p className="text-xs text-steel">findings</p>
                    <div className={`tag text-${color} bg-${color}/20 mt-2`}>
                      {cat.status.toUpperCase()}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Key Findings */}
            <div className="neo-card p-8">
              <h3 className="mb-6">Key Findings & Interpretations</h3>
              <div className="space-y-4">
                {genevaGIData.topFindings.map((finding) => {
                  const severityColor = finding.severity === 'high' ? 'pulse' : finding.severity === 'moderate' ? 'solar' : 'bio';
                  
                  return (
                    <div key={finding.name} className={`p-6 rounded-xl border-2 border-${severityColor}/20 bg-${severityColor}/5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4>{finding.name}</h4>
                            <Badge className={`bg-${severityColor}/20 text-${severityColor}`}>
                              {finding.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-steel mb-1">Current Level</p>
                              <p className="font-bold text-ink">{finding.current}</p>
                            </div>
                            <div>
                              <p className="text-xs text-steel mb-1">Optimal Range</p>
                              <p className="font-bold text-ink">{finding.optimal}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg bg-${severityColor}/10 border border-${severityColor}/20`}>
                        <div className="flex items-start gap-2">
                          <Info className={`w-5 h-5 text-${severityColor} flex-shrink-0 mt-0.5`} />
                          <p className="text-sm text-steel">{finding.impact}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="neo-card-electric p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-void" />
                </div>
                <div className="flex-1">
                  <div className="tag text-electric-dim mb-3">AI PROTOCOL • DUAL ENGINE</div>
                  <h4 className="mb-4">Gut Microbiome Optimization Plan</h4>
                  <p className="text-steel mb-6">
                    Our dual-engine AI has analyzed your Geneva GI Effects results and cross-referenced 
                    with current research to generate personalized interventions.
                  </p>
                  <div className="space-y-3 mb-6">
                    {genevaGIData.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-electric/5 border border-electric/20">
                        <div className="w-6 h-6 rounded-full bg-electric/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-electric">{idx + 1}</span>
                        </div>
                        <p className="text-steel">{rec}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button className="gradient-electric text-void">
                      Start Gut Health Protocol
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline">
                      Share with Practitioner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
