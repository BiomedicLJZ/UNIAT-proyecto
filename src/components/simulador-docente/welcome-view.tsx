'use client';
import { ArrowRight, CheckCircle, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

type WelcomeViewProps = {
  onStart: () => void;
};

export default function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 text-center">
      <div className="bg-card p-10 rounded-3xl shadow-2xl max-w-3xl w-full border-t-8 border-violet-500">
        <div className="mb-8 flex justify-center">
          <div className="bg-violet-100 p-6 rounded-full shadow-inner">
            <Cpu className="w-20 h-20 text-violet-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight font-headline">Comunidad Educativa IA</h1>
        <h2 className="text-2xl text-violet-600 font-bold mb-6 font-headline">Simulador Docente NEM v3.0</h2>
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
          Bienvenido, maestro. Selecciona una <strong>Ruta de Aprendizaje</strong>. Ahora contamos con <strong>Nivel 1 (Fundamentos)</strong> y <strong>Nivel 2 (Profundización)</strong> para cada Campo Formativo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start">
             <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0"/>
             <div>
               <h3 className="font-bold text-blue-800">Escenarios Reales</h3>
               <p className="text-sm text-blue-600">Desde redacción básica hasta inteligencia artificial ética.</p>
             </div>
           </div>
           <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start">
             <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0"/>
             <div>
               <h3 className="font-bold text-purple-800">Interdisciplinario</h3>
               <p className="text-sm text-purple-600">Conecta materias en cada ruta de aprendizaje.</p>
             </div>
           </div>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-xl transition-all transform hover:scale-105 shadow-xl mx-auto"
        >
          Elegir Ruta <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
