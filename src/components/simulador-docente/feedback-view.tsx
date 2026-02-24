'use client';
import { Award, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScenarioOption } from './types';
import { useState } from 'react';

type FeedbackViewProps = {
  option: ScenarioOption;
  onContinue: () => void;
  onRetry: () => void;
};

export default function FeedbackView({ option, onContinue, onRetry }: FeedbackViewProps) {
  const isCorrect = option.isCorrect;

  const reflectionMessages = [
    { title: "La tecnología es el medio, no el fin", text: "Recuerda que el objetivo es detonar el pensamiento crítico del estudiante, no sustituir su esfuerzo cognitivo." },
    { title: "Prioricemos el proceso formativo", text: "La IA puede dar resultados inmediatos, pero el verdadero aprendizaje ocurre en el camino, no en la meta." },
    { title: "El factor humano es irremplazable", text: "Ninguna herramienta digital sustituye la empatía, la ética y el acompañamiento docente que tú brindas." },
  ];
  const successMessages = [
    { title: "¡Excelente Estrategia Didáctica!", text: "Has puesto al estudiante como protagonista, usando la tecnología para potenciar su agencia y creatividad." },
    { title: "Pedagogía Humanista en Acción", text: "Tu decisión fomenta el pensamiento crítico y la conexión emocional, claves para una formación integral." },
    { title: "Metodología Activa Impulsada", text: "Al integrar la IA como herramienta de indagación, promueves la construcción autónoma del conocimiento." },
  ];

  const [randomMessage] = useState(() => {
    const messages = isCorrect ? successMessages : reflectionMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className={`bg-card max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden border-t-8 ${isCorrect ? 'border-green-500' : 'border-primary'}`}>
        <div className="p-8 text-center">
           <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
             {isCorrect ? <Award className="w-10 h-10"/> : <Lightbulb className="w-10 h-10"/>}
           </div>
           
           <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-headline">
             {randomMessage.title}
           </h2>
           
           <p className="text-muted-foreground mb-8 font-medium italic">
             "{randomMessage.text}"
           </p>

           <div className="bg-muted/50 rounded-xl p-6 text-left mb-8 border relative">
             <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${isCorrect ? 'bg-green-400' : 'bg-primary'}`}></div>
             <p className="text-foreground leading-relaxed text-lg">
               {option.feedback}
             </p>
             <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-wider border-t pt-4">
               <span className="text-purple-600">Humanismo: +{option.score.humanismo}</span>
               <span className="text-blue-600">Innovación: +{option.score.innovacion}</span>
             </div>
           </div>

           <div className="flex gap-3 justify-center">
             {isCorrect ? (
                <Button onClick={onContinue} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                  Continuar Camino
                </Button>
             ) : (
               <Button onClick={onRetry} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                  Intentar de Nuevo
                </Button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
