'use client';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Route } from './types';
import ConfettiEffect from '../course/teoria-de-la-imagen/confetti-effect';

type SummaryViewProps = {
  route: Route;
  score: { humanismo: number; innovacion: number };
  onBackToRoutes: () => void;
};

export default function SummaryView({ route, score, onBackToRoutes }: SummaryViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 to-purple-900 flex items-center justify-center p-4">
      <ConfettiEffect />
      <div className="bg-card max-w-2xl w-full rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        <Award className="w-24 h-24 text-yellow-500 mx-auto mb-6 drop-shadow-lg" />
        
        <h1 className="text-4xl font-extrabold text-foreground mb-4 font-headline">¡Ruta Completada!</h1>
        <h2 className={`text-2xl font-bold mb-6 ${route.color.split(' ')[1]} font-headline`}>{route.title}</h2>
        
        <p className="text-muted-foreground text-lg mb-8">
          Has completado con éxito este nivel del Campo Formativo. Tu enfoque humanista en el uso de la IA inspirará a tus alumnos.
        </p>

        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-4xl font-black text-purple-700">{score.humanismo}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">Puntos Humanismo</div>
          </div>
          <div className="w-px bg-border"></div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-700">{score.innovacion}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">Puntos Innovación</div>
          </div>
        </div>

        <Button 
          onClick={onBackToRoutes}
          size="lg"
          className="bg-gray-900 hover:bg-black text-white font-bold transition-all w-full"
        >
          Explorar Otra Ruta
        </Button>
      </div>
    </div>
  );
}
