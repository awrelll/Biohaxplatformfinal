import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Database, 
  Shield, 
  Settings, 
  FileText,
  AlertTriangle,
  TrendingUp,
  Server,
  Lock,
  UserCog,
  BarChart3,
  Key,
  Brain
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SystemHealthMonitor from './SystemHealthMonitor';
import DatabaseStatus from './DatabaseStatus';
import UserManagement from './UserManagement';
import ApplicationConfig from './ApplicationConfig';
import AuditLogs from './AuditLogs';
import SystemMetrics from './SystemMetrics';
import SecurityCenter from './SecurityCenter';
import BackupManagement from './BackupManagement';
import ApiKeyManagement from './ApiKeyManagement';
import LlmUsageTracking from './LlmUsageTracking';

type AdminTab = 'overview' | 'users' | 'health' | 'database' | 'config' | 'security' | 'audit' | 'metrics' | 'backups' | 'apikeys' | 'llm';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  return (
    <div className="min-h-screen mesh-gradient py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-neural flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="mb-3">Admin Control Panel</h1>
          <p className="text-xl text-steel">Super Administrator Dashboard</p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AdminTab)} className="space-y-8">
          {/* Tab Navigation */}
          <div className="neo-card bg-white p-4">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 h-auto bg-transparent p-0">
              <TabsTrigger 
                value="overview" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <LayoutDashboard className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Users</span>
              </TabsTrigger>
              <TabsTrigger 
                value="health" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Activity className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Health</span>
              </TabsTrigger>
              <TabsTrigger 
                value="database" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Database className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Database</span>
              </TabsTrigger>
              <TabsTrigger 
                value="config" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Config</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Lock className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Security</span>
              </TabsTrigger>
              <TabsTrigger 
                value="apikeys" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Key className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">API Keys</span>
              </TabsTrigger>
              <TabsTrigger 
                value="llm" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Brain className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">LLM Usage</span>
              </TabsTrigger>
              <TabsTrigger 
                value="audit" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Audit</span>
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <BarChart3 className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Metrics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="backups" 
                className="neo-card bg-pearl hover:bg-cloud data-[state=active]:gradient-electric data-[state=active]:text-white data-[state=active]:shadow-lg transition-all py-3 px-4 justify-start"
              >
                <Server className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Backups</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="overview" className="space-y-8">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="health">
            <SystemHealthMonitor />
          </TabsContent>

          <TabsContent value="database">
            <DatabaseStatus />
          </TabsContent>

          <TabsContent value="config">
            <ApplicationConfig />
          </TabsContent>

          <TabsContent value="security">
            <SecurityCenter />
          </TabsContent>

          <TabsContent value="apikeys">
            <ApiKeyManagement />
          </TabsContent>

          <TabsContent value="llm">
            <LlmUsageTracking />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLogs />
          </TabsContent>

          <TabsContent value="metrics">
            <SystemMetrics />
          </TabsContent>

          <TabsContent value="backups">
            <BackupManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Overview Component
function SystemOverview() {
  const quickStats = [
    { 
      label: 'Total Users', 
      value: '12,847', 
      change: '+8.2%', 
      trend: 'up',
      icon: Users,
      gradient: 'bio'
    },
    { 
      label: 'Active Sessions', 
      value: '2,341', 
      change: '+12.5%', 
      trend: 'up',
      icon: Activity,
      gradient: 'electric'
    },
    { 
      label: 'System Health', 
      value: '98.9%', 
      change: 'Optimal', 
      trend: 'stable',
      icon: TrendingUp,
      gradient: 'pulse'
    },
    { 
      label: 'Critical Alerts', 
      value: '2', 
      change: 'Needs attention', 
      trend: 'down',
      icon: AlertTriangle,
      gradient: 'neural'
    },
  ];

  const recentActivity = [
    { action: 'New user registration spike', time: '2 min ago', severity: 'info' },
    { action: 'Database backup completed', time: '15 min ago', severity: 'success' },
    { action: 'API rate limit warning', time: '1 hour ago', severity: 'warning' },
    { action: 'Failed login attempts detected', time: '2 hours ago', severity: 'error' },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="neo-card bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="tag text-steel">{stat.label}</p>
                <p className="text-3xl font-bold text-ink">{stat.value}</p>
                <p className={`text-sm ${
                  stat.trend === 'up' ? 'text-bio' : 
                  stat.trend === 'down' ? 'text-pulse' : 
                  'text-electric'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl gradient-${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="neo-card bg-white p-6">
          <h3 className="mb-4">Recent System Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="neo-card bg-pearl p-4 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.severity === 'success' ? 'bg-bio' :
                  activity.severity === 'warning' ? 'bg-neural' :
                  activity.severity === 'error' ? 'bg-pulse' :
                  'bg-electric'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-ink">{activity.action}</p>
                  <p className="text-sm text-steel">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="neo-card bg-white p-6">
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="neo-card bg-pearl hover:bg-cloud transition-all p-4 text-left">
              <UserCog className="w-6 h-6 text-electric mb-2" />
              <p className="font-bold text-ink">Manage Users</p>
            </button>
            <button className="neo-card bg-pearl hover:bg-cloud transition-all p-4 text-left">
              <Database className="w-6 h-6 text-bio mb-2" />
              <p className="font-bold text-ink">Run Backup</p>
            </button>
            <button className="neo-card bg-pearl hover:bg-cloud transition-all p-4 text-left">
              <Activity className="w-6 h-6 text-pulse mb-2" />
              <p className="font-bold text-ink">Health Check</p>
            </button>
            <button className="neo-card bg-pearl hover:bg-cloud transition-all p-4 text-left">
              <Lock className="w-6 h-6 text-neural mb-2" />
              <p className="font-bold text-ink">Security Scan</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}