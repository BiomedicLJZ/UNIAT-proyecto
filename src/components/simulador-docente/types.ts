export type ScenarioOption = {
  id: string;
  text: string;
  feedback: string;
  score: {
    humanismo: number;
    innovacion: number;
  };
  isCorrect: boolean;
};

export type ScenarioResource = {
  type: 'pdf' | 'video' | 'presentation' | 'audio' | 'img' | 'link';
  title: string;
  url: string;
  context?: string;
};

export type Scenario = {
  id: string;
  discipline: string;
  title: string;
  context: string;
  problem: string;
  resources: ScenarioResource[];
  options: ScenarioOption[];
};

export type RouteIconKey =
  | 'message-square'
  | 'bar-chart'
  | 'globe'
  | 'users'
  | 'star'
  | 'zap'
  | 'shield'
  | 'heart';

export type Route = {
  id: string;
  title: string;
  description: string;
  icon: RouteIconKey;
  color: string;
  buttonColor: string;
  scenarios: Scenario[];
};

export type SimulatorInfo = {
  title: string;
  version: string;
  subtitle: string;
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
  introVideo: { title: string; url: string };
  quickLinks: Array<{ label: string; url: string }>;
  highlights: Array<{ title: string; description: string }>;
};
