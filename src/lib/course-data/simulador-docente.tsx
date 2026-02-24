import React from 'react';
import { 
  MessageSquare, 
  BarChart, 
  Users, 
  Globe,
  Heart,
  Shield,
  Star,
  Zap,
} from 'lucide-react';
import type { Route } from '@/components/simulador-docente/types';

export const ROUTES: Route[] = [
  // --- NIVEL 1 ---
  {
    id: 'lenguajes',
    title: 'Lenguajes (Nivel 1)',
    description: 'Español, Inglés y Artes - Fundamentos',
    icon: <MessageSquare className="w-8 h-8" />,
    color: 'bg-pink-100 text-pink-700 border-pink-300',
    buttonColor: 'bg-pink-600 hover:bg-pink-700',
    scenarios: [
      {
        id: 'l1',
        discipline: 'Español',
        title: 'La Crónica de la Comunidad',
        context: 'Los alumnos deben escribir una crónica sobre la historia de su colonia, pero les cuesta estructurar sus ideas y párrafos.',
        problem: '¿Cómo usas Gemini en Docs para apoyar el proceso de escritura sin hacerles la tarea?',
        options: [
          { id: 'a', text: 'Pedir a Gemini que escriba la crónica completa basada en tres palabras clave.', feedback: 'Incorrecto. Esto elimina el proceso cognitivo de redacción y creatividad del alumno.', score: { humanismo: 0, innovacion: 10 }, isCorrect: false },
          { id: 'b', text: 'Usar "Ayúdame a escribir" para generar una estructura o esquema de crónica, y luego pedir sugerencias de conectores lógicos.', feedback: '¡Exacto! Usas la IA como andamiaje para la estructura, permitiendo que el alumno desarrolle el contenido con su propia voz.', score: { humanismo: 10, innovacion: 10 }, isCorrect: true }
        ]
      },
      {
        id: 'l2',
        discipline: 'Inglés',
        title: 'Intercambio Cultural Virtual',
        context: 'Tus alumnos escribirán correos a una escuela en el extranjero. Tienen miedo de cometer errores gramaticales graves.',
        problem: '¿Cómo usar la IA para fomentar confianza y no solo corrección?',
        options: [
          { id: 'a', text: 'Usar Gemini para simular ser el "pen-pal" (amigo por correspondencia) y practicar la conversación antes de enviar el correo real.', feedback: '¡Excelente! Creas un entorno seguro de práctica (Roleplay) que reduce la ansiedad del filtro afectivo.', score: { humanismo: 10, innovacion: 10 }, isCorrect: true },
          { id: 'b', text: 'Escribir el correo en español y traducirlo todo con Google Translate.', feedback: 'Poco formativo. La traducción directa no garantiza el aprendizaje de estructuras ni vocabulario.', score: { humanismo: 2, innovacion: 5 }, isCorrect: false }
        ]
      },
       {
        id: 'l3',
        discipline: 'Artes (Visuales)',
        title: 'Muralismo Digital',
        context: 'Planean un mural sobre la inclusión. Los alumnos tienen ideas abstractas pero no saben cómo bocetarlas.',
        problem: '¿Cómo visualizar conceptos abstractos con IA?',
        options: [
          { id: 'a', text: 'Usar Gemini para generar imágenes con prompts descriptivos como "mural estilo Diego Rivera sobre inclusión y tecnología".', feedback: '¡Correcto! La IA funciona como generador de inspiración visual (moodboard) para guiar la obra física final.', score: { humanismo: 10, innovacion: 10 }, isCorrect: true },
          { id: 'b', text: 'Buscar imágenes de murales ya hechos e imprimirlos para pegarlos.', feedback: 'Limita la creatividad. La idea es crear una obra original inspirada en la visión de los alumnos.', score: { humanismo: 0, innovacion: 0 }, isCorrect: false }
        ]
      },
    ]
  },
  {
    id: 'saberes',
    title: 'Saberes (Nivel 1)',
    description: 'Matemáticas y Ciencias - Fundamentos',
    icon: <BarChart className="w-8 h-8" />,
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    scenarios: [
      {
        id: 's1',
        discipline: 'Matemáticas',
        title: 'Estadística del Desperdicio',
        context: 'Alumnos recolectaron datos sobre basura en el recreo. Tienen tablas llenas de números.',
        problem: 'Análisis de datos.',
        options: [
          { id: 'a', text: 'Subir la tabla a Google Sheets y usar "Explorar" o Gemini para pedir: "¿Qué tipo de basura es más frecuente y genera un gráfico circular?".', feedback: '¡Correcto! Agilizas la talacha (cálculo) para enfocarte en la interpretación ambiental.', score: { humanismo: 10, innovacion: 10 }, isCorrect: true },
          { id: 'b', text: 'Hacer que cuenten todo a mano para que "aprendan a sufrir".', feedback: 'Antipedagógico. El objetivo es el pensamiento estadístico, no la fatiga aritmética.', score: { humanismo: 0, innovacion: 0 }, isCorrect: false }
        ]
      },
    ]
  },
  {
    id: 'etica',
    title: 'Ética y Sociedades (Nivel 1)',
    description: 'Historia, Geografía y Cívica - Fundamentos',
    icon: <Globe className="w-8 h-8" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    scenarios: [
       {
        id: 'e1',
        discipline: 'Geografía',
        title: 'Migración en México',
        context: 'Analizar las causas de la migración en su estado.',
        problem: 'Análisis multifactorial.',
        options: [
          { id: 'a', text: 'Preguntar a la IA: "¿Cuáles son las causas económicas y sociales de la migración en [Mi Estado]?" y debatir las respuestas.', feedback: '¡Correcto! Uso de IA para obtener síntesis informativa rápida y pasar al análisis ético.', score: { humanismo: 10, innovacion: 10 }, isCorrect: true },
          { id: 'b', text: 'Leer el libro de texto de hace 10 años.', feedback: 'Información desactualizada.', score: { humanismo: 2, innovacion: 0 }, isCorrect: false }
        ]
      },
    ]
  },
  {
    id: 'humano',
    title: 'De lo Humano (Nivel 1)',
    description: 'Ed. Física, Tecnología y Socioemocional',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
    scenarios: [
       {
        id: 'h1',
        discipline: 'Educación Física',
        title: 'Plan de Entrenamiento',
        context: 'Cada alumno tiene capacidades físicas diferentes.',
        problem: 'Inclusión física.',
        options: [
          { id: 'a', text: 'Poner a todos a correr 20 vueltas.', feedback: 'Excluyente y militarizado.', score: { humanismo: 0, innovacion: 0 }, isCorrect: false },
          { id: 'b', text: 'Usar IA para sugerir adaptaciones de ejercicios para alumnos con asma, sobrepeso o alta resistencia.', feedback: '¡Inclusivo! Personalización para el bienestar de todos.', score: { humanismo: 10, innovacion: 10 }, isCorrect: true }
        ]
      },
    ]
  },
   {
    id: 'lenguajes2',
    title: 'Lenguajes (Nivel 2)',
    description: 'Profundización: Creatividad Multimedia y Medios',
    icon: <Star className="w-8 h-8" />,
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    scenarios: []
  },
  {
    id: 'saberes2',
    title: 'Saberes (Nivel 2)',
    description: 'Profundización: Innovación y Sustentabilidad',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    buttonColor: 'bg-cyan-600 hover:bg-cyan-700',
    scenarios: []
  },
  {
    id: 'etica2',
    title: 'Ética y Sociedades (Nivel 2)',
    description: 'Profundización: Ciudadanía y Derechos',
    icon: <Shield className="w-8 h-8" />,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    scenarios: []
  },
  {
    id: 'humano2',
    title: 'De lo Humano (Nivel 2)',
    description: 'Profundización: Bienestar y Futuro',
    icon: <Heart className="w-8 h-8" />,
    color: 'bg-rose-100 text-rose-700 border-rose-300',
    buttonColor: 'bg-rose-600 hover:bg-rose-700',
    scenarios: []
  }
];
