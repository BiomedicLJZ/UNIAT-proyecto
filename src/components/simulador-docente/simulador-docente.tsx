'use client';
import React, { useState } from 'react';
import WelcomeView from './welcome-view';
import RoutesView from './routes-view';
import PathView from './path-view';
import ScenarioView from './scenario-view';
import FeedbackView from './feedback-view';
import SummaryView from './summary-view';
import { ROUTES, SIMULADOR_INFO } from '@/lib/course-data/simulador-docente';
import type { Route, Scenario, ScenarioOption } from './types';

export default function SimuladorDocente() {
  const [gameState, setGameState] = useState('welcome'); // welcome, routes, path, scenario, feedback, summary
  const [currentRouteId, setCurrentRouteId] = useState<string | null>(null);
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [score, setScore] = useState({ humanismo: 0, innovacion: 0 });
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null);

  const getCurrentRoute = (): Route | undefined => ROUTES.find(r => r.id === currentRouteId);
  const getCurrentScenario = (): Scenario | undefined => {
    const route = getCurrentRoute();
    return route ? route.scenarios.find(s => s.id === currentScenarioId) : undefined;
  };

  const handleStart = () => setGameState('routes');

  const handleSelectRoute = (routeId: string) => {
    setCurrentRouteId(routeId);
    setGameState('path');
  };

  const handleSelectScenario = (scenarioId: string) => {
    const route = getCurrentRoute();
    if (!route || completedScenarios.includes(scenarioId)) return;

    const index = route.scenarios.findIndex(s => s.id === scenarioId);
    const prevScenarioId = index > 0 ? route.scenarios[index - 1].id : null;

    if (index === 0 || (prevScenarioId && completedScenarios.includes(prevScenarioId))) {
      setCurrentScenarioId(scenarioId);
      setGameState('scenario');
      setSelectedOption(null);
    }
  };

  const handleSubmitOption = () => {
    if (selectedOption) {
      setGameState('feedback');
      setScore(prev => ({
        humanismo: prev.humanismo + selectedOption.score.humanismo,
        innovacion: prev.innovacion + selectedOption.score.innovacion
      }));
      
      if (selectedOption.isCorrect) {
        setCompletedScenarios(prev => [...new Set([...prev, currentScenarioId!])]);
      }
    }
  };

  const handleContinue = () => {
    const route = getCurrentRoute();
    if (route) {
        const allInRouteCompleted = route.scenarios.every(s => completedScenarios.includes(s.id));
        if (allInRouteCompleted) {
            setGameState('summary');
        } else {
            setGameState('path');
        }
    }
  };

  const handleRetry = () => {
    setGameState('scenario');
    setSelectedOption(null);
  };
  
  const handleBackToRoutes = () => setGameState('routes');

  const currentRoute = getCurrentRoute();
  const currentScenario = getCurrentScenario();

  return (
    <div className="font-body antialiased text-gray-900 selection:bg-indigo-100">
      {gameState === 'welcome' && <WelcomeView info={SIMULADOR_INFO} onStart={handleStart} />}
      {gameState === 'routes' && <RoutesView routes={ROUTES} completedScenarios={completedScenarios} onSelectRoute={handleSelectRoute} />}
      {gameState === 'path' && currentRoute && <PathView route={currentRoute} completedScenarios={completedScenarios} score={score} onSelectScenario={handleSelectScenario} onBack={handleBackToRoutes} />}
      {gameState === 'scenario' && currentRoute && currentScenario && <ScenarioView route={currentRoute} scenario={currentScenario} selectedOption={selectedOption} onSelectOption={setSelectedOption} onSubmit={handleSubmitOption} onBack={() => setGameState('path')} />}
      {gameState === 'feedback' && selectedOption && <FeedbackView option={selectedOption} onContinue={handleContinue} onRetry={handleRetry} />}
      {gameState === 'summary' && currentRoute && <SummaryView route={currentRoute} score={score} onBackToRoutes={handleBackToRoutes} />}
    </div>
  );
}
