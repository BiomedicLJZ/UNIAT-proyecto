'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Home, LinkIcon, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SimulatorInfo } from './types';

type WelcomeViewProps = {
  info: SimulatorInfo;
  onStart: () => void;
};

export default function WelcomeView({ info, onStart }: WelcomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 text-center">
      <div className="absolute top-6 left-6">
        <Button asChild variant="ghost" className="font-bold hover:underline">
          <Link href="/">
            <Home className="w-5 h-5 mr-2" /> Inicio
          </Link>
        </Button>
      </div>
      <div className="bg-card p-10 rounded-3xl shadow-2xl max-w-4xl w-full border-t-8 border-violet-500">
        <div className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <div className="relative w-full h-56 rounded-2xl overflow-hidden">
            <Image src={info.heroImageUrl} alt={info.heroImageAlt} fill className="object-cover" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight font-headline">{info.subtitle}</h1>
            <h2 className="text-2xl text-violet-600 font-bold mb-4 font-headline">{info.title} {info.version}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{info.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={info.introVideo.url} target="_blank" rel="noopener noreferrer">
                  <PlayCircle className="w-4 h-4 mr-2" /> {info.introVideo.title}
                </a>
              </Button>
              {info.quickLinks.map((quickLink) => (
                <Button key={quickLink.label} asChild variant="outline" size="sm">
                  <a href={quickLink.url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="w-4 h-4 mr-2" /> {quickLink.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          {info.highlights.map((highlight) => (
            <div key={highlight.title} className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-800">{highlight.title}</h3>
                <p className="text-sm text-blue-600">{highlight.description}</p>
              </div>
            </div>
          ))}
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
