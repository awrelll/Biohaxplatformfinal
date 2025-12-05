import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  UserPlus, 
  Download, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  Plus, 
  Activity, 
  Heart, 
  Zap, 
  Droplet, 
  Flame, 
  Brain, 
  Shield, 
  Sparkles, 
  Lock,
  Crown,
  MessageSquare,
  Bell,
  Calendar,
  BarChart3,
  Users,
  Target,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Star,
  Video,
  FileCheck,
  Briefcase,
  Send,
  Clock,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// Current plan - would come from user context
const currentPlan = 'biohacker'; // 'explorer' | 'biohacker' | 'longevity_pro'

const planLimits = {
  explorer: {
    clients: 5,
    biomarkersPerClient: 50,
    aiInsights: false,
    automatedReports: false,
    videoConsultations: false,
    customBranding: false,
    bulkActions: false,
    advancedAnalytics: false,
    clientMessaging: false,
    automatedFollowUps: false,
  },
  biohacker: {
    clients: 25,
    biomarkersPerClient: 150,
    aiInsights: 'basic',
    automatedReports: false,
    videoConsultations: false,
    customBranding: false,
    bulkActions: true,
    advancedAnalytics: false,
    clientMessaging: true,
    automatedFollowUps: false,
  },
  longevity_pro: {
    clients: -1, // unlimited
    biomarkersPerClient: 150,
    aiInsights: 'advanced',
    automatedReports: true,
    videoConsultations: true,
    customBranding: true,
    bulkActions: true,
    advancedAnalytics: true,
    clientMessaging: true,
    automatedFollowUps: true,
  },
};

const clients = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    age: 34,
    longevityScore: 88,
    scoreChange: +3,
    lastSync: '2 hours ago',
    alerts: 1,
    adherence: 92,
    status: 'optimal',
    statusLabel: 'Optimal',
    lastContact: '3 days ago',
    nextAppointment: 'Tomorrow, 2:00 PM',
    unreadMessages: 2,
  },
  {
    id: '2',
    name: 'Michael Torres',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    age: 42,
    longevityScore: 76,
    scoreChange: -2,
    lastSync: '1 day ago',
    alerts: 3,
    adherence: 78,
    status: 'good',
    statusLabel: 'Good',
    lastContact: '1 week ago',
    nextAppointment: 'Dec 15, 10:00 AM',
    unreadMessages: 0,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    age: 29,
    longevityScore: 91,
    scoreChange: +5,
    lastSync: '5 hours ago',
    alerts: 0,
    adherence: 95,
    status: 'optimal',
    statusLabel: 'Optimal',
    lastContact: '1 day ago',
    nextAppointment: 'Dec 12, 4:00 PM',
    unreadMessages: 1,
  },
  {
    id: '4',
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    age: 51,
    longevityScore: 72,
    scoreChange: +1,
    lastSync: '3 days ago',
    alerts: 2,
    adherence: 65,
    status: 'warning',
    statusLabel: 'Needs Attention',
    lastContact: '2 weeks ago',
    nextAppointment: 'Not scheduled',
    unreadMessages: 5,
  },
];

const aiInsights = [
  {
    id: '1',
    clientName: 'Sarah Chen',
    type: 'opportunity',
    title: 'Vitamin D optimization opportunity',
    description: 'Client\'s recent labs show vitamin D at 32 ng/mL. AI suggests increasing supplementation to reach optimal 50-70 ng/mL range.',
    priority: 'medium',
    generated: '2 hours ago',
  },
  {
    id: '2',
    clientName: 'Michael Torres',
    type: 'alert',
    title: 'Declining adherence pattern detected',
    description: 'AI detected 15% drop in protocol adherence over past 2 weeks. Recommend check-in call to address barriers.',
    priority: 'high',
    generated: '5 hours ago',
  },
  {
    id: '3',
    clientName: 'David Park',
    type: 'success',
    title: 'HbA1c improvement trajectory',
    description: 'Client showing consistent improvement in glucose management. On track to reach target HbA1c in 6 weeks.',
    priority: 'low',
    generated: '1 day ago',
  },
];

const premiumFeatures = [
  {
    title: 'AI-Powered Client Insights',
    description: 'Get automated recommendations from our dual-engine AI (OpenBioLLM + Gemini) for each client',
    icon: Brain,
    requiredPlan: 'longevity_pro',
    color: 'neural',
  },
  {
    title: 'Automated Report Generation',
    description: 'Generate beautiful, branded progress reports for clients automatically each month',
    icon: FileCheck,
    requiredPlan: 'longevity_pro',
    color: 'electric',
  },
  {
    title: 'Video Consultation Integration',
    description: 'Integrated video calls with automatic session notes and action items',
    icon: Video,
    requiredPlan: 'longevity_pro',
    color: 'bio',
  },
  {
    title: 'Custom Branding',
    description: 'White-label your workspace with custom logo, colors, and domain',
    icon: Briefcase,
    requiredPlan: 'longevity_pro',
    color: 'solar',
  },
  {
    title: 'Advanced Analytics Dashboard',
    description: 'Deep cohort analysis, outcome predictions, and benchmarking tools',
    icon: BarChart3,
    requiredPlan: 'longevity_pro',
    color: 'pulse',
  },
  {
    title: 'Automated Follow-Ups',
    description: 'AI-generated follow-up messages based on client progress and milestones',
    icon: Send,
    requiredPlan: 'longevity_pro',
    color: 'electric',
  },
];

const templates = [
  {
    id: '1',
    name: 'Executive Performance Protocol',
    description: 'Comprehensive protocol for high-performing professionals',
    uses: 23,
    color: 'electric',
  },
  {
    id: '2',
    name: 'Athletic Recovery Optimization',
    description: 'Advanced recovery and performance enhancement',
    uses: 18,
    color: 'bio',
  },
  {
    id: '3',
    name: 'Metabolic Health Foundation',
    description: 'Core metabolic health optimization protocol',
    uses: 31,
    color: 'neural',
  },
];

const biomarkerCategories = [
  { id: 'metabolic', name: 'Metabolic Health', color: 'electric', icon: Zap },
  { id: 'cardiovascular', name: 'Cardiovascular', color: 'pulse', icon: Heart },
  { id: 'hormones', name: 'Hormones', color: 'neural', icon: Brain },
  { id: 'inflammation', name: 'Inflammation', color: 'pulse', icon: Flame },
  { id: 'nutrients', name: 'Nutrients & Vitamins', color: 'solar', icon: Droplet },
  { id: 'liver', name: 'Liver Function', color: 'bio', icon: Shield },
  { id: 'kidney', name: 'Kidney Function', color: 'electric', icon: Activity },
  { id: 'thyroid', name: 'Thyroid', color: 'neural', icon: Sparkles },
];

const standardBiomarkers = [
  { id: 'glucose', name: 'Fasting Glucose', category: 'metabolic', unit: 'mg/dL', common: true },
  { id: 'hba1c', name: 'HbA1c', category: 'metabolic', unit: '%', common: true },
  { id: 'insulin', name: 'Fasting Insulin', category: 'metabolic', unit: 'μIU/mL', common: true },
  { id: 'cholesterol', name: 'Total Cholesterol', category: 'cardiovascular', unit: 'mg/dL', common: true },
  { id: 'ldl', name: 'LDL Cholesterol', category: 'cardiovascular', unit: 'mg/dL', common: true },
  { id: 'hdl', name: 'HDL Cholesterol', category: 'cardiovascular', unit: 'mg/dL', common: true },
  { id: 'triglycerides', name: 'Triglycerides', category: 'cardiovascular', unit: 'mg/dL', common: true },
  { id: 'crp', name: 'C-Reactive Protein', category: 'inflammation', unit: 'mg/L', common: true },
  { id: 'testosterone', name: 'Testosterone', category: 'hormones', unit: 'ng/dL', common: true },
  { id: 'cortisol', name: 'Cortisol', category: 'hormones', unit: 'μg/dL', common: true },
  { id: 'vitamin-d', name: 'Vitamin D (25-OH)', category: 'nutrients', unit: 'ng/mL', common: true },
  { id: 'b12', name: 'Vitamin B12', category: 'nutrients', unit: 'pg/mL', common: true },
  { id: 'tsh', name: 'TSH', category: 'thyroid', unit: 'μIU/mL', common: true },
  { id: 't3', name: 'Free T3', category: 'thyroid', unit: 'pg/mL', common: false },
  { id: 't4', name: 'Free T4', category: 'thyroid', unit: 'ng/dL', common: false },
  { id: 'alt', name: 'ALT', category: 'liver', unit: 'U/L', common: true },
  { id: 'ast', name: 'AST', category: 'liver', unit: 'U/L', common: true },
  { id: 'creatinine', name: 'Creatinine', category: 'kidney', unit: 'mg/dL', common: true },
  { id: 'bun', name: 'BUN', category: 'kidney', unit: 'mg/dL', common: true },
  { id: 'homocysteine', name: 'Homocysteine', category: 'cardiovascular', unit: 'μmol/L', common: false },
  { id: 'apob', name: 'ApoB', category: 'cardiovascular', unit: 'mg/dL', common: false },
  { id: 'ferritin', name: 'Ferritin', category: 'nutrients', unit: 'ng/mL', common: true },
  { id: 'magnesium', name: 'Magnesium', category: 'nutrients', unit: 'mg/dL', common: true },
];

export default function PractitionerWorkspace() {
  const [isAddingBiomarker, setIsAddingBiomarker] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([
    'glucose', 'hba1c', 'cholesterol', 'ldl', 'hdl', 'crp', 'testosterone', 'vitamin-d', 'tsh', 'alt', 'creatinine'
  ]);
  const [clientPlan, setClientPlan] = useState('biohacker');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const currentLimits = planLimits[currentPlan as keyof typeof planLimits];
  const maxBiomarkers = clientPlan === 'explorer' ? 50 : 150;
  const currentBiomarkerCount = selectedBiomarkers.length;
  const clientCount = clients.length;

  const toggleBiomarker = (biomarkerId: string) => {
    if (selectedBiomarkers.includes(biomarkerId)) {
      setSelectedBiomarkers(selectedBiomarkers.filter(id => id !== biomarkerId));
    } else {
      if (currentBiomarkerCount < maxBiomarkers) {
        setSelectedBiomarkers([...selectedBiomarkers, biomarkerId]);
      }
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { class: string; color: string }> = {
      optimal: { class: 'status-optimal', color: 'bio' },
      good: { class: 'status-good', color: 'electric' },
      warning: { class: 'status-warning', color: 'solar' },
      critical: { class: 'status-critical', color: 'pulse' },
    };
    return configs[status] || configs.good;
  };

  const UpgradePrompt = ({ feature, className = '' }: { feature?: string; className?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`neo-card p-6 bg-gradient-to-br from-solar/10 via-electric/10 to-neural/10 border-2 border-electric/30 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl gradient-solar flex items-center justify-center flex-shrink-0">
          <Crown className="w-6 h-6 text-void" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4>Upgrade to Longevity Pro</h4>
            <Badge className="bg-solar text-void">Premium</Badge>
          </div>
          <p className="text-steel mb-4">
            {feature || 'Unlock advanced practitioner features to serve your clients better with AI-powered insights, automated workflows, and unlimited client capacity.'}
          </p>
          <div className="flex items-center gap-3">
            <Button className="gradient-electric text-void" onClick={() => setShowUpgradeModal(true)}>
              <Rocket className="w-4 h-4 mr-2" />
              View Upgrade Options
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const LockedFeature = ({ title, description }: { title: string; description: string }) => (
    <div className="neo-card p-8 opacity-60 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <Lock className="w-6 h-6 text-steel" />
      </div>
      <h4 className="mb-2">{title}</h4>
      <p className="text-steel mb-4">{description}</p>
      <Button variant="outline" className="pointer-events-none">
        <Lock className="w-4 h-4 mr-2" />
        Upgrade Required
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen mesh-gradient py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="tag text-steel">PRACTITIONER WORKSPACE</div>
              <Badge className="bg-electric/20 text-electric">
                {currentPlan === 'explorer' && 'Explorer'}
                {currentPlan === 'biohacker' && 'Biohacker'}
                {currentPlan === 'longevity_pro' && 'Longevity Pro'}
              </Badge>
            </div>
            <h2 className="mb-4">Manage your clients</h2>
            <p className="text-xl text-steel max-w-2xl">
              Collaborate on health journeys, customize biomarker panels, and track cohort performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Export Reports
            </Button>
            <Button size="lg" disabled={currentLimits.clients !== -1 && clientCount >= currentLimits.clients}>
              <UserPlus className="w-5 h-5 mr-2" />
              Add Client
              {currentLimits.clients !== -1 && ` (${clientCount}/${currentLimits.clients})`}
            </Button>
          </div>
        </div>

        {/* Plan Limit Warning */}
        {currentPlan !== 'longevity_pro' && clientCount >= currentLimits.clients * 0.8 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card p-6 bg-neural/5 border-2 border-neural/20"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-neural flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="mb-2">Approaching Client Limit</h4>
                <p className="text-steel mb-4">
                  You're using {clientCount} of {currentLimits.clients} client slots on your {currentPlan} plan. 
                  Upgrade to Longevity Pro for unlimited clients.
                </p>
                <Button variant="outline" size="sm" onClick={() => setShowUpgradeModal(true)}>
                  <Crown className="w-4 h-4 mr-2" />
                  View Upgrade Options
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neo-card-electric p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center">
                <Users className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">TOTAL CLIENTS</div>
                <div className="text-3xl font-bold text-ink">
                  {clientCount}
                  {currentLimits.clients !== -1 && (
                    <span className="text-lg text-steel">/{currentLimits.clients}</span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-bio font-semibold">+3 this month</p>
          </div>

          <div className="neo-card-bio p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bio flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">AVG. ADHERENCE</div>
                <div className="text-3xl font-bold text-ink">84%</div>
              </div>
            </div>
            <p className="text-sm text-bio font-semibold">+5% vs last month</p>
          </div>

          <div className="neo-card-neural p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-neural flex items-center justify-center">
                <FileText className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">ACTIVE PROTOCOLS</div>
                <div className="text-3xl font-bold text-ink">47</div>
              </div>
            </div>
            <p className="text-sm text-steel">Across all clients</p>
          </div>

          <div className="neo-card-pulse p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-pulse flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">PENDING ACTIONS</div>
                <div className="text-3xl font-bold text-ink">6</div>
              </div>
            </div>
            <p className="text-sm text-pulse font-semibold">Needs attention</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 neo-card p-1">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="insights">
              AI Insights
              {currentLimits.aiInsights === false && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="upgrade">
              <Crown className="w-4 h-4 mr-1" />
              Upgrade
            </TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="mt-8 space-y-6">
            <div className="neo-card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
                  <Input
                    placeholder="Search clients..."
                    className="pl-12 h-12"
                  />
                </div>
                {currentLimits.bulkActions && (
                  <div className="flex items-center gap-3">
                    <Button variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Message All
                    </Button>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Bulk Schedule
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {clients.map((client) => {
                  const statusConfig = getStatusConfig(client.status);

                  return (
                    <motion.div 
                      key={client.id} 
                      className="neo-card p-6 hover:scale-[1.01] transition-transform"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16 border-2 border-electric">
                            <AvatarImage src={client.avatar} alt={client.name} />
                            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3>{client.name}</h3>
                              {client.unreadMessages > 0 && (
                                <Badge className="bg-pulse text-void">
                                  {client.unreadMessages} new
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={statusConfig.class} />
                              <span className={`text-sm font-semibold text-${statusConfig.color}`}>
                                {client.statusLabel}
                              </span>
                              <span className="text-sm text-steel">• Age {client.age}</span>
                              <span className="text-sm text-steel">• {client.lastSync}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="tag text-steel mb-2">SCORE</div>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold gradient-text-electric">{client.longevityScore}</div>
                              {client.scoreChange !== 0 && (
                                <Badge className={client.scoreChange > 0 ? 'bg-bio/20 text-bio' : 'bg-pulse/20 text-pulse'}>
                                  {client.scoreChange > 0 ? '+' : ''}{client.scoreChange}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="text-center min-w-[120px]">
                            <div className="tag text-steel mb-2">ADHERENCE</div>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-pearl rounded-full h-2 overflow-hidden">
                                <div 
                                  className="gradient-bio h-2 transition-all" 
                                  style={{ width: `${client.adherence}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold text-ink">{client.adherence}%</span>
                            </div>
                          </div>

                          {client.alerts > 0 && (
                            <Badge variant="destructive" className="text-sm">
                              {client.alerts} Alert{client.alerts > 1 ? 's' : ''}
                            </Badge>
                          )}

                          <div className="flex items-center gap-2">
                            {currentLimits.clientMessaging ? (
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                <Lock className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            )}
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>

                      {/* Next Appointment */}
                      <div className="mt-4 pt-4 border-t-2 border-cloud flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-steel" />
                            <span className="text-steel">Next: </span>
                            <span className="font-semibold text-ink">{client.nextAppointment}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-steel" />
                            <span className="text-steel">Last contact: </span>
                            <span className="font-semibold text-ink">{client.lastContact}</span>
                          </div>
                        </div>
                        {currentLimits.videoConsultations ? (
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Start Video Call
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            <Lock className="w-4 h-4 mr-2" />
                            Video Call
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="mt-8 space-y-6">
            {currentLimits.aiInsights === false ? (
              <UpgradePrompt feature="Unlock AI-powered insights with our dual-engine system (OpenBioLLM + Gemini) to get automated recommendations, pattern detection, and predictive analytics for each client." />
            ) : (
              <>
                <div className="neo-card p-6 bg-gradient-to-r from-neural/10 to-electric/10 border-2 border-electric/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl gradient-neural flex items-center justify-center">
                      <Brain className="w-7 h-7 text-void" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3>Dual-Engine AI Insights</h3>
                        <Badge className="bg-electric text-void">
                          <Sparkles className="w-3 h-3 mr-1" />
                          OpenBioLLM + Gemini
                        </Badge>
                      </div>
                      <p className="text-steel">
                        Cross-checked recommendations from two AI engines ensure the highest accuracy and best outcomes for your clients.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {aiInsights.map((insight) => {
                    const priorityConfig = {
                      high: { bg: 'bg-pulse/10', border: 'border-pulse/30', text: 'text-pulse', icon: AlertCircle },
                      medium: { bg: 'bg-solar/10', border: 'border-solar/30', text: 'text-solar', icon: AlertTriangle },
                      low: { bg: 'bg-bio/10', border: 'border-bio/30', text: 'text-bio', icon: CheckCircle2 },
                    };
                    const config = priorityConfig[insight.priority as keyof typeof priorityConfig];
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={insight.id}
                        className={`neo-card p-6 ${config.bg} border-2 ${config.border}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex items-start gap-4">
                          <Icon className={`w-6 h-6 ${config.text} flex-shrink-0 mt-1`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4>{insight.title}</h4>
                              <Badge variant="outline" className="text-xs">{insight.clientName}</Badge>
                              <Badge className={`${config.bg} ${config.text} text-xs capitalize`}>
                                {insight.priority} priority
                              </Badge>
                            </div>
                            <p className="text-steel mb-3">{insight.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-steel">Generated {insight.generated}</span>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">Dismiss</Button>
                                <Button size="sm" className="gradient-electric text-void">
                                  Take Action
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {currentPlan === 'biohacker' && (
                  <div className="neo-card p-6 bg-gradient-to-r from-solar/5 to-electric/5 border-2 border-electric/20">
                    <div className="flex items-start gap-4">
                      <Star className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="mb-2">Unlock Advanced AI Insights</h4>
                        <p className="text-steel mb-4">
                          Upgrade to Longevity Pro for predictive analytics, automated follow-up generation, and outcome forecasting.
                        </p>
                        <Button size="sm" onClick={() => setShowUpgradeModal(true)}>
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade to Pro
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Biomarker Panels Tab */}
          <TabsContent value="biomarkers" className="mt-8 space-y-8">
            {/* Panel Header */}
            <div className="neo-card-neural p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <h3 className="mb-3">Biomarker Panel Management</h3>
                  <p className="text-steel">
                    Customize biomarker panels for your clients based on their subscription tier
                  </p>
                </div>
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Custom Biomarker
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="client-select" className="mb-3 block font-semibold">Select Client</Label>
                  <Select value={selectedClient || ''} onValueChange={setSelectedClient}>
                    <SelectTrigger id="client-select" className="h-12">
                      <SelectValue placeholder="Choose a client to manage biomarkers" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-3">
                  <Badge variant="default" className="bg-neural text-white px-4 py-2">
                    {clientPlan === 'explorer' ? 'Explorer Plan' : 'Biohacker Plan'}
                  </Badge>
                  <Badge 
                    variant={currentBiomarkerCount >= maxBiomarkers * 0.9 ? 'warning' : 'success'}
                    className="px-4 py-2"
                  >
                    {currentBiomarkerCount}/{maxBiomarkers} Biomarkers
                  </Badge>
                </div>
              </div>

              {currentBiomarkerCount >= maxBiomarkers && (
                <div className="mt-6 p-6 rounded-2xl bg-solar/10 border-2 border-solar/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-solar flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-2">Biomarker Limit Reached</h4>
                      <p className="text-steel">
                        This client has reached the maximum of {maxBiomarkers} biomarkers for their plan.
                        {clientPlan === 'explorer' && ' Upgrade to Biohacker plan for up to 150 biomarkers.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Biomarker Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {biomarkerCategories.map((category) => {
                const categoryBiomarkers = standardBiomarkers.filter(b => b.category === category.id);
                const selectedInCategory = categoryBiomarkers.filter(b => selectedBiomarkers.includes(b.id)).length;
                const Icon = category.icon;
                const cardClass = `neo-card-${category.color}`;
                const gradientClass = `gradient-${category.color}`;

                return (
                  <div key={category.id} className={`${cardClass} p-8`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-void" />
                        </div>
                        <div>
                          <h4 className="mb-1">{category.name}</h4>
                          <span className="text-sm text-steel">
                            {selectedInCategory} of {categoryBiomarkers.length} selected
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Select All
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {categoryBiomarkers.slice(0, 5).map((biomarker) => {
                        const isSelected = selectedBiomarkers.includes(biomarker.id);
                        const canSelect = currentBiomarkerCount < maxBiomarkers || isSelected;

                        return (
                          <div
                            key={biomarker.id}
                            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                              isSelected 
                                ? 'bg-white border-2 border-bio' 
                                : canSelect
                                ? 'bg-white/50 border-2 border-cloud hover:border-electric'
                                : 'bg-pearl/50 border-2 border-cloud opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleBiomarker(biomarker.id)}
                                disabled={!canSelect}
                              />
                              <div>
                                <div className="font-semibold text-ink">{biomarker.name}</div>
                                <div className="text-xs text-steel">{biomarker.unit}</div>
                              </div>
                            </div>
                            {biomarker.common && (
                              <Badge variant="secondary" className="text-xs">Common</Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save Panel */}
            <div className="neo-card-electric p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="mb-2">Biomarker Panel Configuration</h4>
                  <p className="text-steel">
                    {currentBiomarkerCount} biomarkers selected • {maxBiomarkers - currentBiomarkerCount} remaining
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Reset to Default</Button>
                  <Button className="gradient-electric text-void">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save Panel
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Protocol Templates Tab */}
          <TabsContent value="templates" className="mt-8 space-y-6">
            {templates.map((template) => {
              const cardClass = `neo-card-${template.color}`;
              const gradientClass = `gradient-${template.color}`;

              return (
                <div key={template.id} className={`${cardClass} p-8 hover:scale-[1.01] transition-transform`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                        <FileText className="w-7 h-7 text-void" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{template.name}</h3>
                          <Badge variant="secondary">{template.uses} uses</Badge>
                        </div>
                        <p className="text-steel">{template.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">Edit Template</Button>
                      <Button>Apply to Client</Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="neo-card p-12 w-full hover:scale-[1.01] transition-transform text-center cursor-pointer">
              <Plus className="w-12 h-12 mx-auto mb-4 text-steel" />
              <h4 className="mb-2">Create New Template</h4>
              <p className="text-steel">Build custom protocol templates for your practice</p>
            </div>

            {!currentLimits.automatedReports && (
              <div className="neo-card p-6 bg-gradient-to-r from-solar/5 to-electric/5 border-2 border-electric/20">
                <div className="flex items-start gap-4">
                  <FileCheck className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="mb-2">Automated Report Generation</h4>
                    <p className="text-steel mb-4">
                      Upgrade to Longevity Pro to automatically generate beautiful, branded progress reports from your templates each month.
                    </p>
                    <Button size="sm" onClick={() => setShowUpgradeModal(true)}>
                      <Crown className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Upgrade Tab */}
          <TabsContent value="upgrade" className="mt-8 space-y-8">
            <div className="neo-card p-8 bg-gradient-to-br from-solar/10 via-electric/10 to-neural/10">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl gradient-solar flex items-center justify-center flex-shrink-0">
                  <Crown className="w-8 h-8 text-void" />
                </div>
                <div>
                  <h2 className="mb-3">Upgrade to Longevity Pro</h2>
                  <p className="text-xl text-steel mb-6">
                    Unlock the full power of AI-driven client management, unlimited capacity, and advanced practitioner tools.
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-4xl font-bold text-ink">$50</p>
                      <p className="text-sm text-steel">/month</p>
                    </div>
                    <Button size="lg" className="gradient-electric text-void">
                      <Rocket className="w-5 h-5 mr-2" />
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink">Unlimited Clients</p>
                    <p className="text-sm text-steel">No limits on client capacity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink">Dual-Engine AI Insights</p>
                    <p className="text-sm text-steel">OpenBioLLM + Gemini analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink">Automated Reports</p>
                    <p className="text-sm text-steel">Monthly client progress reports</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink">Video Consultations</p>
                    <p className="text-sm text-steel">Integrated video calls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink">Custom Branding</p>
                    <p className="text-sm text-steel">White-label your workspace</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink">Advanced Analytics</p>
                    <p className="text-sm text-steel">Deep cohort insights</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6">Premium Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {premiumFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  const isUnlocked = currentPlan === 'longevity_pro';

                  return (
                    <motion.div
                      key={idx}
                      className={`neo-card p-6 ${!isUnlocked ? 'opacity-60' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isUnlocked ? 1 : 0.6, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl gradient-${feature.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-void" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4>{feature.title}</h4>
                            {!isUnlocked && <Lock className="w-4 h-4 text-steel" />}
                          </div>
                          <p className="text-steel">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="neo-card p-8">
              <h3 className="mb-6 text-center">Plan Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-cloud">
                      <th className="text-left p-4">Feature</th>
                      <th className="text-center p-4">Explorer</th>
                      <th className="text-center p-4">Biohacker</th>
                      <th className="text-center p-4 bg-electric/10">
                        <div className="flex items-center justify-center gap-2">
                          <Crown className="w-4 h-4 text-solar" />
                          <span>Longevity Pro</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">Client Limit</td>
                      <td className="text-center p-4">5</td>
                      <td className="text-center p-4">25</td>
                      <td className="text-center p-4 bg-electric/5">
                        <Badge className="bg-bio text-void">Unlimited</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">Biomarkers per Client</td>
                      <td className="text-center p-4">50</td>
                      <td className="text-center p-4">150</td>
                      <td className="text-center p-4 bg-electric/5">150</td>
                    </tr>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">AI Insights (Dual Engine)</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="w-5 h-5 text-electric mx-auto" />
                      </td>
                      <td className="text-center p-4 bg-electric/5">
                        <Badge className="bg-bio text-void">Advanced</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">Client Messaging</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="w-5 h-5 text-bio mx-auto" />
                      </td>
                      <td className="text-center p-4 bg-electric/5">
                        <CheckCircle2 className="w-5 h-5 text-bio mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">Automated Reports</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4 bg-electric/5">
                        <CheckCircle2 className="w-5 h-5 text-bio mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">Video Consultations</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4 bg-electric/5">
                        <CheckCircle2 className="w-5 h-5 text-bio mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-cloud">
                      <td className="p-4 font-semibold">Custom Branding</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4 bg-electric/5">
                        <CheckCircle2 className="w-5 h-5 text-bio mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Advanced Analytics</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4">—</td>
                      <td className="text-center p-4 bg-electric/5">
                        <CheckCircle2 className="w-5 h-5 text-bio mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <Crown className="w-8 h-8 text-solar" />
              Upgrade to Longevity Pro
            </DialogTitle>
            <DialogDescription>
              Unlock unlimited clients and advanced AI-powered features to serve your practice better
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="neo-card p-6 bg-gradient-to-r from-electric/10 to-neural/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-3xl font-bold text-ink">$50/month</p>
                  <p className="text-steel">Longevity Pro Plan</p>
                </div>
                <Button size="lg" className="gradient-electric text-void">
                  <Rocket className="w-5 h-5 mr-2" />
                  Upgrade Now
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Unlimited clients',
                  'AI insights (dual engine)',
                  'Automated reports',
                  'Video consultations',
                  'Custom branding',
                  'Advanced analytics',
                  'Bulk actions',
                  'Priority support',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-bio flex-shrink-0" />
                    <span className="text-sm text-ink">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
