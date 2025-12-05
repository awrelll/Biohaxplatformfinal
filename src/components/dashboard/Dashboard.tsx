import { 
  TrendingUp, 
  Flame, 
  Heart, 
  Activity, 
  Moon, 
  Zap, 
  Droplet,
  Battery,
  Target,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

// Whoop API data structure (from real API)
const whoopData = {
  recovery: {
    score: 82,
    hrv: 68, // ms
    rhr: 52, // bpm
    sleepPerformance: 88, // %
    trend: 'up',
  },
  strain: {
    current: 14.2,
    target: 14.0,
    yesterday: 12.8,
    weekly: 78.5,
  },
  sleep: {
    hours: 7.8,
    quality: 88,
    stages: {
      deep: 1.5,
      rem: 2.1,
      light: 3.9,
      awake: 0.3,
    },
    debt: -0.5, // positive is debt, negative is surplus
  },
  todaysWorkout: {
    sport: 'Weightlifting',
    duration: 75, // minutes
    strain: 14.2,
    avgHR: 128,
    maxHR: 165,
    kilojoules: 1247,
    zones: {
      zone2: 35, // minutes
      zone3: 15,
      zone4: 10,
    },
  },
};

// Weekly Strain Chart Data
const weeklyStrainData = [
  { day: 'Mon', strain: 11.2, recovery: 75 },
  { day: 'Tue', strain: 13.5, recovery: 68 },
  { day: 'Wed', strain: 10.8, recovery: 82 },
  { day: 'Thu', strain: 14.9, recovery: 71 },
  { day: 'Fri', strain: 12.3, recovery: 79 },
  { day: 'Sat', strain: 16.2, recovery: 65 },
  { day: 'Sun', strain: 9.8, recovery: 88 },
];

export default function Dashboard() {
  const recoveryColor = whoopData.recovery.score >= 67 ? 'bio' : whoopData.recovery.score >= 34 ? 'solar' : 'pulse';
  const strainColor = whoopData.strain.current >= 14 ? 'pulse' : whoopData.strain.current >= 10 ? 'solar' : 'bio';

  return (
    <div className="min-h-screen mesh-gradient py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="mb-3">Welcome back, Alex</h1>
            <p className="text-xl text-steel">Your daily performance snapshot from Whoop</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="neo-card px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-bio animate-pulse" />
              <span className="text-sm font-semibold text-steel">Whoop Synced 10m ago</span>
            </div>
          </div>
        </div>

        {/* Hero Metrics - Recovery & Strain */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recovery Score */}
          <motion.div 
            className={`neo-card-${recoveryColor} p-8 relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full gradient-bio opacity-10 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="tag text-steel">RECOVERY SCORE</div>
                <div className={`px-3 py-1.5 rounded-full bg-${recoveryColor}/20`}>
                  <TrendingUp className={`w-4 h-4 text-${recoveryColor} inline mr-1`} />
                  <span className={`text-sm font-bold text-${recoveryColor}`}>+7% vs yesterday</span>
                </div>
              </div>
              
              <div className="flex items-end gap-4 mb-6">
                <div className={`text-7xl font-bold text-${recoveryColor}`}>{whoopData.recovery.score}</div>
                <div className="text-2xl text-steel pb-2">/ 100</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/50 border border-cloud">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-pulse" />
                    <span className="text-xs text-steel">HRV</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">{whoopData.recovery.hrv}</div>
                  <div className="text-xs text-steel">ms</div>
                </div>
                <div className="p-4 rounded-xl bg-white/50 border border-cloud">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-pulse" />
                    <span className="text-xs text-steel">RHR</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">{whoopData.recovery.rhr}</div>
                  <div className="text-xs text-steel">bpm</div>
                </div>
                <div className="p-4 rounded-xl bg-white/50 border border-cloud">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-4 h-4 text-neural" />
                    <span className="text-xs text-steel">Sleep</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">{whoopData.recovery.sleepPerformance}</div>
                  <div className="text-xs text-steel">%</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl bg-${recoveryColor}/10 border-2 border-${recoveryColor}/20`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 text-${recoveryColor} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className="font-semibold text-ink mb-1">Green Recovery - Ready to Train</p>
                    <p className="text-sm text-steel">
                      Your body is well-recovered. Today is optimal for high-strain activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Daily Strain */}
          <motion.div 
            className={`neo-card-${strainColor} p-8 relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full gradient-pulse opacity-10 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="tag text-steel">DAILY STRAIN</div>
                <div className={`px-3 py-1.5 rounded-full bg-${strainColor}/20`}>
                  <Flame className={`w-4 h-4 text-${strainColor} inline mr-1`} />
                  <span className={`text-sm font-bold text-${strainColor}`}>
                    {whoopData.strain.current >= whoopData.strain.target ? 'Goal Met!' : 'In Progress'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-end gap-4 mb-6">
                <div className={`text-7xl font-bold text-${strainColor}`}>{whoopData.strain.current}</div>
                <div className="text-2xl text-steel pb-2">/ {whoopData.strain.target}</div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-steel">Progress to Goal</span>
                  <span className="text-sm font-bold text-ink">
                    {Math.min(((whoopData.strain.current / whoopData.strain.target) * 100), 100).toFixed(0)}%
                  </span>
                </div>
                <div className="relative w-full h-3 bg-pearl rounded-full overflow-hidden">
                  <motion.div
                    className={`gradient-${strainColor} h-3 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((whoopData.strain.current / whoopData.strain.target) * 100, 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Today's Workout Summary */}
              <div className="p-4 rounded-xl bg-white/50 border border-cloud mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg gradient-${strainColor} flex items-center justify-center`}>
                      <Zap className="w-4 h-4 text-void" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{whoopData.todaysWorkout.sport}</p>
                      <p className="text-xs text-steel">{whoopData.todaysWorkout.duration} min</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-steel">Avg HR</p>
                    <p className="font-bold text-ink">{whoopData.todaysWorkout.avgHR} bpm</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-steel">Zone 2</p>
                    <p className="text-sm font-bold text-bio">{whoopData.todaysWorkout.zones.zone2}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-steel">Zone 3</p>
                    <p className="text-sm font-bold text-solar">{whoopData.todaysWorkout.zones.zone3}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-steel">Zone 4+</p>
                    <p className="text-sm font-bold text-pulse">{whoopData.todaysWorkout.zones.zone4}m</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-steel">
                Weekly Strain: <span className="font-bold text-ink">{whoopData.strain.weekly}</span> / 90.0
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sleep Performance */}
          <div className="col-span-12 lg:col-span-7 neo-card-neural p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="tag text-steel mb-2">LAST NIGHT</div>
                <h3>Sleep Performance</h3>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neural/20">
                <Moon className="w-5 h-5 text-neural" />
                <span className="font-bold text-neural">{whoopData.sleep.quality}% Quality</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-neural/5 border border-neural/20">
                <p className="text-xs text-steel mb-1">Total Sleep</p>
                <p className="text-3xl font-bold text-ink">{whoopData.sleep.hours}</p>
                <p className="text-xs text-steel">hours</p>
              </div>
              <div className="p-4 rounded-xl bg-bio/5 border border-bio/20">
                <p className="text-xs text-steel mb-1">Deep Sleep</p>
                <p className="text-3xl font-bold text-bio">{whoopData.sleep.stages.deep}</p>
                <p className="text-xs text-steel">hours</p>
              </div>
              <div className="p-4 rounded-xl bg-electric/5 border border-electric/20">
                <p className="text-xs text-steel mb-1">REM Sleep</p>
                <p className="text-3xl font-bold text-electric">{whoopData.sleep.stages.rem}</p>
                <p className="text-xs text-steel">hours</p>
              </div>
              <div className="p-4 rounded-xl bg-pulse/5 border border-pulse/20">
                <p className="text-xs text-steel mb-1">Light Sleep</p>
                <p className="text-3xl font-bold text-pulse">{whoopData.sleep.stages.light}</p>
                <p className="text-xs text-steel">hours</p>
              </div>
            </div>

            {whoopData.sleep.debt < 0 ? (
              <div className="p-4 rounded-xl bg-bio/5 border-2 border-bio/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-bio" />
                  <p className="text-sm text-steel">
                    <span className="font-bold text-bio">{Math.abs(whoopData.sleep.debt).toFixed(1)} hours</span> sleep surplus. Excellent recovery overnight.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-solar/5 border-2 border-solar/20">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-solar" />
                  <p className="text-sm text-steel">
                    <span className="font-bold text-solar">{whoopData.sleep.debt.toFixed(1)} hours</span> sleep debt. Consider earlier bedtime tonight.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Weekly Strain Chart */}
          <div className="col-span-12 lg:col-span-5 neo-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3>Weekly Strain</h3>
              <div className="tag text-steel">7 DAYS</div>
            </div>

            <div className="h-48 flex items-end justify-between gap-2 mb-4">
              {weeklyStrainData.map((day, idx) => {
                const percentage = (day.strain / 20) * 100;
                const isToday = idx === weeklyStrainData.length - 1;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full">
                      <motion.div
                        className={`w-full ${isToday ? 'gradient-pulse' : 'gradient-electric'} rounded-t-lg`}
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage * 1.8}px` }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-ink">
                        {day.strain}
                      </div>
                    </div>
                    <span className={`text-xs ${isToday ? 'font-bold text-pulse' : 'text-steel'}`}>
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-cloud">
              <div className="flex items-center justify-between text-sm">
                <span className="text-steel">Weekly Average</span>
                <span className="font-bold text-ink">
                  {(weeklyStrainData.reduce((sum, d) => sum + d.strain, 0) / weeklyStrainData.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Today's Protocol */}
          <div className="col-span-12 lg:col-span-6 neo-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="tag text-steel mb-2">TODAY'S PROTOCOL</div>
                <h3>Recovery Stack</h3>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10">
                <div className="status-optimal" />
                <span className="text-sm font-bold text-bio">1/3 Complete</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Magnesium Glycinate', dose: '400mg', time: '8:00 AM', completed: true },
                { name: 'Zone 2 Recovery Walk', dose: '30 min', time: '10:00 AM', completed: false },
                { name: 'Cold Plunge', dose: '3 min', time: '12:00 PM', completed: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    item.completed
                      ? 'bg-bio/5 border-2 border-bio/20'
                      : 'bg-pearl border-2 border-cloud'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.completed ? 'gradient-bio' : 'bg-cloud'
                  }`}>
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Clock className="w-5 h-5 text-steel" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold text-ink mb-0.5">{item.name}</div>
                    <div className="text-sm text-steel">{item.dose} • {item.time}</div>
                  </div>

                  {item.completed && (
                    <div className="tag text-bio">DONE</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Based on Whoop Data */}
          <div className="col-span-12 lg:col-span-6 neo-card-electric p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-electric-dim mb-2">AI INSIGHT • DUAL ENGINE</div>
                <h4 className="mb-3">Optimize Your Recovery Window</h4>
              </div>
            </div>
            
            <p className="text-steel leading-relaxed mb-6">
              Your HRV is elevated at <span className="font-bold text-ink">{whoopData.recovery.hrv}ms</span> and RHR is low at <span className="font-bold text-ink">{whoopData.recovery.rhr} bpm</span>. Both indicate excellent parasympathetic activity. 
              Your recovery score of <span className="font-bold text-bio">{whoopData.recovery.score}</span> suggests your body is primed for high-intensity training today.
            </p>

            <div className="p-4 rounded-xl bg-electric/10 border border-electric/20 mb-6">
              <p className="text-sm font-semibold text-ink mb-2">Recommended Actions:</p>
              <ul className="space-y-1 text-sm text-steel">
                <li>• Target 15-18 strain with strength or HIIT training</li>
                <li>• Maintain Zone 2 base with 30-40 min cardio</li>
                <li>• Aim for 8+ hours sleep tonight to maintain recovery</li>
              </ul>
            </div>

            <button className="text-sm font-bold text-electric hover:text-electric-bright transition-colors flex items-center gap-2">
              View Full Protocol
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="tag text-steel mb-2">TODAY'S SCHEDULE</div>
              <h2>December 5, 2025</h2>
            </div>
            <button className="text-sm font-bold text-electric hover:text-electric-bright transition-colors flex items-center gap-2">
              View Full Calendar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            {[
              { time: '7:00 AM', title: 'Morning Recovery Stack', status: 'completed', color: 'bio' },
              { time: '10:00 AM', title: 'Zone 2 Training (Cycling)', status: 'completed', color: 'electric' },
              { time: '2:00 PM', title: 'Strength Training Session', status: 'active', color: 'pulse' },
              { time: '9:00 PM', title: 'Sleep Preparation Protocol', status: 'upcoming', color: 'neural' },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className={`w-24 h-16 rounded-xl gradient-${event.color} flex flex-col items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                  <span className="text-lg font-bold">{event.time.split(' ')[0]}</span>
                  <span className="text-xs opacity-80">{event.time.split(' ')[1]}</span>
                </div>

                <div className={`flex-1 p-6 rounded-xl transition-all ${
                  event.status === 'active'
                    ? `neo-card-${event.color} glow-${event.color}`
                    : event.status === 'completed'
                    ? 'neo-card bg-pearl'
                    : 'neo-card'
                }`}>
                  <div className="flex items-center justify-between">
                    <h4>{event.title}</h4>
                    <div className={`tag ${
                      event.status === 'completed'
                        ? 'text-bio bg-bio/10'
                        : event.status === 'active'
                        ? `text-${event.color} bg-${event.color}/10 animate-glow-pulse`
                        : 'text-steel bg-cloud'
                    } px-3 py-1.5 rounded-full`}>
                      {event.status === 'completed' ? '✓ DONE' : event.status === 'active' ? '● IN PROGRESS' : 'UPCOMING'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
