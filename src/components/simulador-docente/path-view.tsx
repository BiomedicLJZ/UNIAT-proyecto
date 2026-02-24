'use client';
import { Home, Heart, Cpu, CheckCircle, Lock } from 'lucide-react';
import type { Route } from './types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PathViewProps = {
  route: Route;
  completedScenarios: string[];
  score: { humanismo: number; innovacion: number };
  onSelectScenario: (scenarioId: string) => void;
  onBack: () => void;
};

export default function PathView({ route, completedScenarios, score, onSelectScenario, onBack }: PathViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className={`${route.color} p-6 shadow-md z-10 sticky top-0`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center font-bold hover:underline opacity-80 hover:opacity-100">
            <Home className="w-5 h-5 mr-2" /> Menú
          </Button>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 truncate font-headline">
            {route.icon} {route.title}
          </h2>
          <div className="flex gap-4 text-xs md:text-sm font-bold bg-white/30 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="flex items-center"><Heart className="w-4 h-4 mr-1" /> {score.humanismo}</span>
            <span className="flex items-center"><Cpu className="w-4 h-4 mr-1" /> {score.innovacion}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 z-0 hidden md:block"></div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          {route.scenarios.map((scenario, index) => {
            const isCompleted = completedScenarios.includes(scenario.id);
            const isLocked = index > 0 && !completedScenarios.includes(route.scenarios[index-1].id);
            const isCurrent = !isCompleted && !isLocked;

            return (
              <div key={scenario.id} className="flex items-center w-full group">
                <div className="w-full flex md:contents">
                  <div className={cn("w-full md:w-1/2", index % 2 === 0 ? "md:text-right md:pr-8" : "md:order-last md:text-left md:pl-8")}>
                    <h3 className={cn("font-bold text-lg font-headline", isLocked ? 'text-gray-400' : 'text-gray-800')}>{scenario.discipline}</h3>
                    <p className={cn("text-sm", isLocked ? 'text-gray-400' : 'text-muted-foreground')}>{scenario.title}</p>
                  </div>
                  <div className="hidden md:block md:w-auto relative">
                    <Button 
                      onClick={() => onSelectScenario(scenario.id)}
                      disabled={isLocked || isCompleted}
                      variant="default"
                      size="icon"
                      className={cn(
                        "w-16 h-16 rounded-full border-4 shadow-lg transition-all transform z-20 relative",
                        isCompleted && 'bg-green-500 border-green-200 text-white cursor-default',
                        isCurrent && `${route.buttonColor.replace('hover:', '')} border-white scale-110 ring-4 ring-violet-200 animate-pulse text-white`,
                        isLocked && 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed',
                        !isLocked && !isCompleted && `cursor-pointer hover:scale-110 text-white ${route.buttonColor.replace('hover:', '')}`
                      )}
                    >
                      {isCompleted ? <CheckCircle className="w-8 h-8"/> : isLocked ? <Lock className="w-6 h-6"/> : <span className="font-bold text-xl">{index + 1}</span>}
                    </Button>
                  </div>
                </div>
                 {/* Mobile button */}
                 <div className="md:hidden ml-4">
                  <Button
                    onClick={() => onSelectScenario(scenario.id)}
                    disabled={isLocked || isCompleted}
                    variant="default"
                    size="icon"
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md transition-all",
                      isCompleted && 'bg-green-500 border-green-200 text-white cursor-default',
                      isCurrent && `${route.buttonColor.replace('hover:', '')} border-white ring-4 ring-violet-200 text-white`,
                      isLocked && 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed',
                      !isLocked && !isCompleted && `cursor-pointer text-white ${route.buttonColor.replace('hover:', '')}`
                    )}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6"/> : isLocked ? <Lock className="w-5 h-5"/> : <span className="font-bold text-lg">{index + 1}</span>}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
