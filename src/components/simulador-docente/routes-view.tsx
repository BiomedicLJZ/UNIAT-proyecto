'use client';
import { ArrowRight, Home } from 'lucide-react';
import type { Route } from './types';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { renderRouteIcon } from './icon-map';

type RoutesViewProps = {
  routes: Route[];
  completedScenarios: string[];
  onSelectRoute: (routeId: string) => void;
};

export default function RoutesView({ routes, completedScenarios, onSelectRoute }: RoutesViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-6xl mx-auto mb-10 text-center relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Button asChild variant="ghost" className="font-bold hover:underline">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" /> Inicio
              </Link>
            </Button>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2 font-headline">Selecciona tu Ruta de Formación</h2>
        <p className="text-muted-foreground text-lg">Explora los Niveles de la Nueva Escuela Mexicana</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {routes.map((route) => {
          const completedInRoute = route.scenarios.filter(s => completedScenarios.includes(s.id)).length;
          const totalInRoute = route.scenarios.length > 0 ? route.scenarios.length : 1; // Avoid division by zero
          const progress = (completedInRoute / totalInRoute) * 100;

          return (
            <div 
              key={route.id}
              className="bg-card rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-violet-400 transition-all cursor-pointer group"
              onClick={() => onSelectRoute(route.id)}
            >
              <div className={`${route.color} p-6 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    {renderRouteIcon(route.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline">{route.title}</h3>
                    <p className="opacity-90 font-medium text-sm">{route.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Progreso</span>
                  <span className="font-bold text-foreground text-sm">
                    {completedInRoute} / {totalInRoute}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
