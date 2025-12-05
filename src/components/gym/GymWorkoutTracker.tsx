import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Dumbbell, 
  TrendingUp, 
  Flame, 
  Target, 
  Trophy, 
  BarChart3, 
  Activity,
  Heart,
  Zap,
  Calendar,
  Clock,
  MapPin,
  Mountain,
  Timer,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  Plus,
  Filter,
  Download,
  Share2,
  ChevronRight,
  Wifi,
  WifiOff,
  AlertCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';

// Whoop API Sport IDs (from https://developer.whoop.com/docs/developing/user-data/workout)
const SPORT_TYPES = {
  '-1': 'Activity',
  0: 'Running',
  1: 'Cycling',
  16: 'Baseball',
  17: 'Basketball',
  18: 'Rowing',
  19: 'Fencing',
  20: 'Field Hockey',
  21: 'Football',
  22: 'Golf',
  24: 'Ice Hockey',
  25: 'Lacrosse',
  27: 'Rugby',
  28: 'Sailing',
  29: 'Skiing',
  30: 'Soccer',
  31: 'Softball',
  32: 'Squash',
  33: 'Swimming',
  34: 'Tennis',
  35: 'Track & Field',
  36: 'Volleyball',
  37: 'Water Polo',
  38: 'Wrestling',
  39: 'Boxing',
  42: 'Dance',
  43: 'Pilates',
  44: 'Yoga',
  45: 'Weightlifting',
  47: 'Cross Country Skiing',
  48: 'Functional Fitness',
  49: 'Duathlon',
  51: 'Gymnastics',
  52: 'Hiking/Rucking',
  53: 'Horseback Riding',
  55: 'Kayaking',
  56: 'Martial Arts',
  57: 'Mountain Biking',
  59: 'Powerlifting',
  60: 'Rock Climbing',
  61: 'Paddleboarding',
  62: 'Triathlon',
  63: 'Walking',
  64: 'Surfing',
  65: 'Elliptical',
  66: 'Stairmaster',
  70: 'Meditation',
  71: 'Other',
  73: 'Diving',
  74: 'Operations - Tactical',
  75: 'Operations - Medical',
  76: 'Operations - Flying',
  77: 'Operations - Water',
  82: 'Ultimate',
  83: 'Climber',
  84: 'Jumping Rope',
  85: 'Australian Football',
  86: 'Skateboarding',
  87: 'Coaching',
  88: 'Ice Bath',
  89: 'Commuting',
  90: 'Gaming',
  91: 'Snowboarding',
  92: 'Motocross',
  93: 'Caddying',
  94: 'Obstacle Course Racing',
  95: 'Motor Racing',
  96: 'HIIT',
  97: 'Spin',
  98: 'Jiu Jitsu',
  99: 'Manual Labor',
  100: 'Cricket',
  101: 'Pickleball',
  102: 'Inline Skating',
  103: 'Box Fitness',
  104: 'Spikeball',
  105: 'Wheelchair Pushing',
  106: 'Paddle Tennis',
  107: 'Barre',
  108: 'Stage Performance',
  109: 'High Stress Work',
  110: 'Parkour',
  111: 'Gaelic Football',
  112: 'Hurling/Camogie',
  113: 'Circus Arts',
  121: 'Massage Therapy',
  125: 'Watching Sports',
  126: 'Assault Bike',
  127: 'Kickboxing',
  128: 'Stretching',
  230: 'Table Tennis',
  231: 'Badminton',
  232: 'Netball',
  233: 'Sauna',
  234: 'Disc Golf',
  235: 'Yard Work',
  236: 'Air Compression',
  237: 'Percussive Massage',
  238: 'Paintball',
  239: 'Ice Skating',
  240: 'Handball',
};

// Mock Whoop API workout data structure
const recentWorkouts = [
  {
    id: 1,
    user_id: 10129,
    created_at: '2024-12-05T14:30:00.000Z',
    updated_at: '2024-12-05T15:45:00.000Z',
    start: '2024-12-05T14:30:00.000Z',
    end: '2024-12-05T15:45:00.000Z',
    timezone_offset: '-05:00',
    sport_id: 45, // Weightlifting
    score_state: 'SCORED',
    score: {
      strain: 14.2,
      average_heart_rate: 128,
      max_heart_rate: 165,
      kilojoule: 1247.5,
      percent_recorded: 100,
      distance_meter: 0,
      altitude_gain_meter: 0,
      altitude_change_meter: 0,
      zone_duration: {
        zone_zero_milli: 450000,  // 7.5 min
        zone_one_milli: 1200000,  // 20 min
        zone_two_milli: 2100000,  // 35 min
        zone_three_milli: 900000, // 15 min
        zone_four_milli: 600000,  // 10 min
        zone_five_milli: 150000,  // 2.5 min
      },
    },
  },
  {
    id: 2,
    user_id: 10129,
    created_at: '2024-12-04T06:00:00.000Z',
    updated_at: '2024-12-04T07:00:00.000Z',
    start: '2024-12-04T06:00:00.000Z',
    end: '2024-12-04T07:00:00.000Z',
    timezone_offset: '-05:00',
    sport_id: 0, // Running
    score_state: 'SCORED',
    score: {
      strain: 11.8,
      average_heart_rate: 142,
      max_heart_rate: 178,
      kilojoule: 2145.3,
      percent_recorded: 100,
      distance_meter: 8047, // 5 miles
      altitude_gain_meter: 52,
      altitude_change_meter: 48,
      zone_duration: {
        zone_zero_milli: 300000,
        zone_one_milli: 600000,
        zone_two_milli: 2400000, // 40 min in Zone 2
        zone_three_milli: 300000,
        zone_four_milli: 0,
        zone_five_milli: 0,
      },
    },
  },
  {
    id: 3,
    user_id: 10129,
    created_at: '2024-12-03T17:00:00.000Z',
    updated_at: '2024-12-03T17:30:00.000Z',
    start: '2024-12-03T17:00:00.000Z',
    end: '2024-12-03T17:30:00.000Z',
    timezone_offset: '-05:00',
    sport_id: 96, // HIIT
    score_state: 'SCORED',
    score: {
      strain: 16.5,
      average_heart_rate: 156,
      max_heart_rate: 188,
      kilojoule: 987.2,
      percent_recorded: 100,
      distance_meter: 0,
      altitude_gain_meter: 0,
      altitude_change_meter: 0,
      zone_duration: {
        zone_zero_milli: 180000,
        zone_one_milli: 240000,
        zone_two_milli: 300000,
        zone_three_milli: 360000,
        zone_four_milli: 600000, // 10 min
        zone_five_milli: 120000, // 2 min
      },
    },
  },
  {
    id: 4,
    user_id: 10129,
    created_at: '2024-12-02T07:30:00.000Z',
    updated_at: '2024-12-02T08:45:00.000Z',
    start: '2024-12-02T07:30:00.000Z',
    end: '2024-12-02T08:45:00.000Z',
    timezone_offset: '-05:00',
    sport_id: 1, // Cycling
    score_state: 'SCORED',
    score: {
      strain: 13.7,
      average_heart_rate: 135,
      max_heart_rate: 168,
      kilojoule: 2890.5,
      percent_recorded: 100,
      distance_meter: 32186, // 20 miles
      altitude_gain_meter: 245,
      altitude_change_meter: 238,
      zone_duration: {
        zone_zero_milli: 450000,
        zone_one_milli: 900000,
        zone_two_milli: 3150000, // 52.5 min in Zone 2
        zone_three_milli: 0,
        zone_four_milli: 0,
        zone_five_milli: 0,
      },
    },
  },
];

const weeklyStats = {
  totalWorkouts: 12,
  totalStrain: 156.8,
  avgStrain: 13.1,
  totalKilojoules: 18437,
  totalDistance: 98543, // meters
  totalDuration: 36000000, // milliseconds (10 hours)
  avgHeartRate: 138,
  maxHeartRate: 188,
  zone2Minutes: 328, // Total Zone 2 time this week
  zone4Plus: 87, // Total high-intensity time
};

const strainGoals = {
  daily: { target: 14.0, current: 14.2 },
  weekly: { target: 90.0, current: 78.5 },
};

export default function GymWorkoutTracker() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [whoopConnected, setWhoopConnected] = useState(true); // Simulate connection status

  // Helper functions
  const formatDuration = (startIso: string, endIso: string) => {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);
    return `${minutes} min`;
  };

  const formatDistance = (meters: number) => {
    if (meters === 0) return null;
    const miles = (meters * 0.000621371).toFixed(2);
    const km = (meters / 1000).toFixed(2);
    return `${miles} mi (${km} km)`;
  };

  const getStrainColor = (strain: number) => {
    if (strain >= 18) return 'pulse';
    if (strain >= 14) return 'solar';
    if (strain >= 10) return 'electric';
    return 'bio';
  };

  const getStrainLabel = (strain: number) => {
    if (strain >= 18) return 'All Out';
    if (strain >= 14) return 'Strenuous';
    if (strain >= 10) return 'Moderate';
    return 'Light';
  };

  const formatZoneTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    if (minutes === 0) return '0m';
    return `${minutes}m`;
  };

  const getZonePercentage = (zoneDuration: any) => {
    const total = Object.values(zoneDuration).reduce((sum: number, val) => sum + (val as number), 0);
    return {
      zone0: ((zoneDuration.zone_zero_milli / total) * 100).toFixed(0),
      zone1: ((zoneDuration.zone_one_milli / total) * 100).toFixed(0),
      zone2: ((zoneDuration.zone_two_milli / total) * 100).toFixed(0),
      zone3: ((zoneDuration.zone_three_milli / total) * 100).toFixed(0),
      zone4: ((zoneDuration.zone_four_milli / total) * 100).toFixed(0),
      zone5: ((zoneDuration.zone_five_milli / total) * 100).toFixed(0),
    };
  };

  return (
    <div className="min-h-screen mesh-gradient py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="tag text-steel">WORKOUT TRACKING</div>
              {whoopConnected ? (
                <Badge className="bg-bio/20 text-bio">
                  <Wifi className="w-3 h-3 mr-1" />
                  Whoop Connected
                </Badge>
              ) : (
                <Badge className="bg-steel/20 text-steel">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Not Connected
                </Badge>
              )}
            </div>
            <h2 className="mb-4">Workout & Performance Tracking</h2>
            <p className="text-xl text-steel max-w-2xl">
              Track workouts, monitor strain, and optimize training with Whoop integration
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Export Data
            </Button>
            <Button size="lg" className="gradient-electric text-void">
              <Play className="w-5 h-5 mr-2" />
              Log Workout
            </Button>
          </div>
        </div>

        {/* Whoop Connection Notice */}
        {!whoopConnected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card p-6 bg-electric/5 border-2 border-electric/20"
          >
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="mb-2">Connect Your Whoop Device</h4>
                <p className="text-steel mb-4">
                  Sync your Whoop data to automatically track strain, heart rate zones, recovery, and sleep metrics for complete performance insights.
                </p>
                <Button className="gradient-electric text-void">
                  <Wifi className="w-4 h-4 mr-2" />
                  Connect Whoop
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Weekly Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neo-card-electric p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">WORKOUTS THIS WEEK</div>
                <div className="text-3xl font-bold text-ink">{weeklyStats.totalWorkouts}</div>
              </div>
            </div>
            <p className="text-sm text-bio font-semibold">+3 vs last week</p>
          </div>

          <div className="neo-card-pulse p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-pulse flex items-center justify-center">
                <Flame className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">TOTAL STRAIN</div>
                <div className="text-3xl font-bold text-ink">{weeklyStats.totalStrain.toFixed(1)}</div>
              </div>
            </div>
            <p className="text-sm text-steel">Avg: {weeklyStats.avgStrain.toFixed(1)} per workout</p>
          </div>

          <div className="neo-card-bio p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bio flex items-center justify-center">
                <Heart className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">AVG HEART RATE</div>
                <div className="text-3xl font-bold text-ink">{weeklyStats.avgHeartRate}</div>
              </div>
            </div>
            <p className="text-sm text-steel">Max: {weeklyStats.maxHeartRate} bpm</p>
          </div>

          <div className="neo-card-neural p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-neural flex items-center justify-center">
                <Target className="w-6 h-6 text-void" />
              </div>
              <div>
                <div className="tag text-steel mb-1">ZONE 2 TRAINING</div>
                <div className="text-3xl font-bold text-ink">{weeklyStats.zone2Minutes}m</div>
              </div>
            </div>
            <p className="text-sm text-bio font-semibold">Optimal for longevity</p>
          </div>
        </div>

        {/* Daily Strain Goal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="neo-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Daily Strain Goal</h3>
              <Badge className={`bg-${getStrainColor(strainGoals.daily.current)}/20 text-${getStrainColor(strainGoals.daily.current)}`}>
                {strainGoals.daily.current >= strainGoals.daily.target ? 'Goal Met!' : 'In Progress'}
              </Badge>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <div className="text-5xl font-bold gradient-text-electric">{strainGoals.daily.current}</div>
              <div className="text-2xl text-steel pb-2">/ {strainGoals.daily.target}</div>
            </div>
            <div className="relative w-full h-3 bg-pearl rounded-full overflow-hidden">
              <motion.div
                className={`gradient-${getStrainColor(strainGoals.daily.current)} h-3 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((strainGoals.daily.current / strainGoals.daily.target) * 100, 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="neo-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Weekly Strain Goal</h3>
              <Badge className="bg-electric/20 text-electric">
                {((strainGoals.weekly.current / strainGoals.weekly.target) * 100).toFixed(0)}% Complete
              </Badge>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <div className="text-5xl font-bold gradient-text-bio">{strainGoals.weekly.current}</div>
              <div className="text-2xl text-steel pb-2">/ {strainGoals.weekly.target}</div>
            </div>
            <div className="relative w-full h-3 bg-pearl rounded-full overflow-hidden">
              <motion.div
                className="gradient-bio h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(strainGoals.weekly.current / strainGoals.weekly.target) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-4 neo-card p-1">
            <TabsTrigger value="recent">Recent Workouts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="zones">HR Zones</TabsTrigger>
            <TabsTrigger value="sports">By Sport</TabsTrigger>
          </TabsList>

          {/* Recent Workouts Tab */}
          <TabsContent value="recent" className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="0">Running</SelectItem>
                    <SelectItem value="1">Cycling</SelectItem>
                    <SelectItem value="45">Weightlifting</SelectItem>
                    <SelectItem value="96">HIIT</SelectItem>
                    <SelectItem value="44">Yoga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-steel">{recentWorkouts.length} workouts tracked</p>
            </div>

            <div className="space-y-4">
              {recentWorkouts.map((workout, idx) => {
                const duration = formatDuration(workout.start, workout.end);
                const distance = formatDistance(workout.score.distance_meter);
                const strainColor = getStrainColor(workout.score.strain);
                const strainLabel = getStrainLabel(workout.score.strain);
                const zonePercentages = getZonePercentage(workout.score.zone_duration);

                return (
                  <motion.div
                    key={workout.id}
                    className="neo-card p-6 hover:scale-[1.01] transition-transform cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-xl gradient-${strainColor} flex items-center justify-center flex-shrink-0`}>
                          <Dumbbell className="w-8 h-8 text-void" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{SPORT_TYPES[workout.sport_id as keyof typeof SPORT_TYPES] || 'Activity'}</h3>
                            <Badge className={`bg-${strainColor}/20 text-${strainColor}`}>
                              Strain: {workout.score.strain}
                            </Badge>
                            <Badge variant="outline">{strainLabel}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-steel mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(workout.start).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{duration}</span>
                            </div>
                            {distance && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{distance}</span>
                              </div>
                            )}
                            {workout.score.altitude_gain_meter > 0 && (
                              <div className="flex items-center gap-1">
                                <Mountain className="w-4 h-4" />
                                <span>{workout.score.altitude_gain_meter}m gain</span>
                              </div>
                            )}
                          </div>

                          {/* Heart Rate Zones */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-steel mb-1">
                              <span>Heart Rate Zones</span>
                              <span>Avg: {workout.score.average_heart_rate} bpm • Max: {workout.score.max_heart_rate} bpm</span>
                            </div>
                            <div className="flex h-2 rounded-full overflow-hidden bg-pearl">
                              {parseInt(zonePercentages.zone0) > 0 && (
                                <div 
                                  className="bg-cloud" 
                                  style={{ width: `${zonePercentages.zone0}%` }}
                                  title={`Zone 0: ${formatZoneTime(workout.score.zone_duration.zone_zero_milli)}`}
                                />
                              )}
                              {parseInt(zonePercentages.zone1) > 0 && (
                                <div 
                                  className="bg-bio/40" 
                                  style={{ width: `${zonePercentages.zone1}%` }}
                                  title={`Zone 1: ${formatZoneTime(workout.score.zone_duration.zone_one_milli)}`}
                                />
                              )}
                              {parseInt(zonePercentages.zone2) > 0 && (
                                <div 
                                  className="bg-bio" 
                                  style={{ width: `${zonePercentages.zone2}%` }}
                                  title={`Zone 2: ${formatZoneTime(workout.score.zone_duration.zone_two_milli)}`}
                                />
                              )}
                              {parseInt(zonePercentages.zone3) > 0 && (
                                <div 
                                  className="bg-solar" 
                                  style={{ width: `${zonePercentages.zone3}%` }}
                                  title={`Zone 3: ${formatZoneTime(workout.score.zone_duration.zone_three_milli)}`}
                                />
                              )}
                              {parseInt(zonePercentages.zone4) > 0 && (
                                <div 
                                  className="bg-neural" 
                                  style={{ width: `${zonePercentages.zone4}%` }}
                                  title={`Zone 4: ${formatZoneTime(workout.score.zone_duration.zone_four_milli)}`}
                                />
                              )}
                              {parseInt(zonePercentages.zone5) > 0 && (
                                <div 
                                  className="bg-pulse" 
                                  style={{ width: `${zonePercentages.zone5}%` }}
                                  title={`Zone 5: ${formatZoneTime(workout.score.zone_duration.zone_five_milli)}`}
                                />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-bio" />
                                  <span className="text-steel">Z2: {formatZoneTime(workout.score.zone_duration.zone_two_milli)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-solar" />
                                  <span className="text-steel">Z3: {formatZoneTime(workout.score.zone_duration.zone_three_milli)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-pulse" />
                                  <span className="text-steel">Z4-5: {formatZoneTime(workout.score.zone_duration.zone_four_milli + workout.score.zone_duration.zone_five_milli)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="tag text-steel mb-2">KILOJOULES</div>
                          <div className="text-2xl font-bold text-ink">{workout.score.kilojoule.toFixed(0)}</div>
                          <p className="text-xs text-steel">~{Math.round(workout.score.kilojoule * 0.239)} cal</p>
                        </div>

                        <Button size="sm">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="neo-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Weekly Strain Trend</h3>
                  <Badge className="bg-bio/20 text-bio">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% vs last week
                  </Badge>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[78, 85, 92, 88, 95, 102, 107].map((value, idx) => {
                    const percentage = (value / 120) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full">
                          <motion.div
                            className={`w-full gradient-${idx === 6 ? 'electric' : 'bio'} rounded-t-lg`}
                            initial={{ height: 0 }}
                            animate={{ height: `${percentage * 2.4}px` }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                          />
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-ink">
                            {value}
                          </div>
                        </div>
                        <span className="text-xs text-steel">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="neo-card p-6">
                <h3 className="mb-6">Performance Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-steel">Zone 2 (Endurance)</span>
                      <span className="text-sm font-bold text-bio">328 min</span>
                    </div>
                    <div className="w-full bg-pearl rounded-full h-2 overflow-hidden">
                      <div className="gradient-bio h-2 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-steel">Zone 3 (Tempo)</span>
                      <span className="text-sm font-bold text-solar">87 min</span>
                    </div>
                    <div className="w-full bg-pearl rounded-full h-2 overflow-hidden">
                      <div className="gradient-solar h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-steel">Zone 4-5 (High Intensity)</span>
                      <span className="text-sm font-bold text-pulse">43 min</span>
                    </div>
                    <div className="w-full bg-pearl rounded-full h-2 overflow-hidden">
                      <div className="gradient-pulse h-2 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-bio/5 border-2 border-bio/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-bio flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ink mb-1">Optimal Training Balance</p>
                      <p className="text-sm text-steel">
                        Your Zone 2 training is excellent for longevity. 72% of weekly volume in the optimal zone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* HR Zones Tab */}
          <TabsContent value="zones" className="mt-8">
            <div className="neo-card p-8">
              <h3 className="mb-6">Heart Rate Zone Distribution</h3>
              <div className="space-y-6">
                {[
                  { zone: 'Zone 0', color: 'cloud', range: '< 50% Max HR', minutes: 28, percent: 6 },
                  { zone: 'Zone 1', color: 'bio', range: '50-60% Max HR', minutes: 45, percent: 10 },
                  { zone: 'Zone 2', color: 'bio', range: '60-70% Max HR', minutes: 328, percent: 72 },
                  { zone: 'Zone 3', color: 'solar', range: '70-80% Max HR', minutes: 32, percent: 7 },
                  { zone: 'Zone 4', color: 'neural', range: '80-90% Max HR', minutes: 18, percent: 4 },
                  { zone: 'Zone 5', color: 'pulse', range: '90-100% Max HR', minutes: 7, percent: 1 },
                ].map((zone, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full bg-${zone.color}`} />
                        <div>
                          <span className="font-semibold text-ink">{zone.zone}</span>
                          <span className="text-sm text-steel ml-3">{zone.range}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-ink">{zone.minutes} min</span>
                        <span className="text-sm text-steel ml-3">{zone.percent}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-pearl rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-${zone.color} h-3 rounded-full transition-all`}
                        style={{ width: `${zone.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* By Sport Tab */}
          <TabsContent value="sports" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { sport: 'Weightlifting', sport_id: 45, count: 4, avgStrain: 14.2, color: 'electric' },
                { sport: 'Running', sport_id: 0, count: 3, avgStrain: 11.8, color: 'bio' },
                { sport: 'Cycling', sport_id: 1, count: 3, avgStrain: 13.7, color: 'neural' },
                { sport: 'HIIT', sport_id: 96, count: 2, avgStrain: 16.5, color: 'pulse' },
              ].map((sport, idx) => (
                <motion.div
                  key={idx}
                  className={`neo-card-${sport.color} p-6 cursor-pointer hover:scale-105 transition-transform`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-xl gradient-${sport.color} flex items-center justify-center mb-4`}>
                    <Activity className="w-6 h-6 text-void" />
                  </div>
                  <h4 className="mb-2">{sport.sport}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-steel">Workouts</span>
                      <span className="font-bold text-ink">{sport.count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-steel">Avg Strain</span>
                      <span className={`font-bold text-${sport.color}`}>{sport.avgStrain}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Details
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
