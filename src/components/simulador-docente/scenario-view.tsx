'use client';
import { ArrowLeft, Activity, ExternalLink, ImageIcon, LinkIcon, MapPin, PlayCircle } from 'lucide-react';
import type { Route, Scenario, ScenarioOption } from './types';
import { Button } from '@/components/ui/button';
import { renderRouteIcon } from './icon-map';
import { cn } from '@/lib/utils';

type ScenarioViewProps = {
  route: Route;
  scenario: Scenario;
  selectedOption: ScenarioOption | null;
  onSelectOption: (option: ScenarioOption) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export default function ScenarioView({ route, scenario, selectedOption, onSelectOption, onSubmit, onBack }: ScenarioViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-card max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <div className={cn(route.color, "p-8 md:w-1/3 text-white flex flex-col justify-between")}>
           <div>
             <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 mb-6 opacity-80 hover:opacity-100 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
                <span className="uppercase tracking-widest text-xs font-bold">Volver al mapa</span>
             </Button>
             <div className="mb-4 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               {scenario.discipline}
             </div>
             <h2 className="text-3xl font-bold mb-4 leading-tight font-headline">{scenario.title}</h2>
             <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
               <h4 className="font-bold mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2"/> Contexto:</h4>
               <p className="text-sm opacity-90 leading-relaxed">{scenario.context}</p>
             </div>
           </div>
           <div className="mt-8">
             <p className="text-xs opacity-60 mb-2">Campo Formativo:</p>
             <div className="flex items-center gap-2 font-bold font-headline">
               {renderRouteIcon(route.icon)} {route.title}
             </div>
           </div>
        </div>

        <div className="p-8 md:w-2/3 flex flex-col justify-center bg-card">
           <h3 className="text-xl font-bold text-foreground mb-6 flex items-start">
             <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3 mt-1"><Activity className="w-5 h-5"/></span>
             {scenario.problem}
           </h3>

           <div className="space-y-4 mb-8">
            {scenario.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelectOption(option)}
                className={cn(
                    'w-full p-5 rounded-xl border-2 text-left transition-all flex items-start group hover:shadow-md',
                    selectedOption?.id === option.id
                    ? `border-violet-500 bg-violet-50 ring-2 ring-violet-200`
                    : 'border-border bg-background hover:border-gray-300'
                )}
              >
                <div className={cn(
                    'w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors',
                    selectedOption?.id === option.id ? 'border-violet-600' : 'border-gray-300 group-hover:border-gray-400'
                )}>
                  {selectedOption?.id === option.id && <div className="w-3 h-3 bg-violet-600 rounded-full" />}
                </div>
                <span className={cn(
                    'text-sm md:text-base',
                    selectedOption?.id === option.id ? 'text-violet-900 font-medium' : 'text-muted-foreground'
                )}>
                  {option.text}
                </span>
              </button>
            ))}
          </div>

          {scenario.resources.length > 0 && (
            <div className="mb-8 rounded-xl border p-4 bg-muted/20">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">Recursos sugeridos</h4>
              <div className="grid gap-3">
                {scenario.resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {resource.type === 'video' ? <PlayCircle className="w-4 h-4" /> : resource.type === 'img' ? <ImageIcon className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                      {resource.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={onSubmit}
            disabled={!selectedOption}
            size="lg"
            className="w-full font-bold text-lg transition-all transform disabled:bg-muted-foreground/10 disabled:text-muted-foreground/50 bg-gray-900 text-white hover:bg-black enabled:hover:scale-[1.02] shadow-xl"
          >
            Confirmar Decisión
          </Button>
        </div>
      </div>
    </div>
  );
}
