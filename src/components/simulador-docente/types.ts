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

export type Scenario = {
  id: string;
  discipline: string;
  title: string;
  context: string;
  problem: string;
  options: ScenarioOption[];
};

export type Route = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  buttonColor: string;
  scenarios: Scenario[];
};
