'use client';
import React, { useState, useRef, useEffect, useTransition } from 'react';
import {
  Sparkles,
  X,
  MessageSquare,
  Bot,
  Send,
  Upload,
  Loader,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { aiConversationTutor } from '@/ai/flows/ai-conversation-tutor-flow';
import { aiVisualAnalysisTool } from '@/ai/flows/ai-visual-analysis-tool';
import type { Module } from './types';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const ImageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-image', className)}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);


export default function GeminiAssistant({ currentModule }: { currentModule: Module }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'vision'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: '¡Hola! Soy tu asistente de Teoría de la Imagen. Puedo ayudarte a aclarar conceptos o analizar imágenes visualmente. ¿En qué te puedo ayudar hoy? ✨',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg: Message = { role: 'user', text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');

    startTransition(async () => {
      try {
        const moduleContext = `Current Module: ${currentModule.title}. Content: ${JSON.stringify(currentModule.content, null, 2)}`;
        const response = await aiConversationTutor({ studentQuestion: currentInput, moduleContext });
        setMessages((prev) => [...prev, { role: 'model', text: response.aiResponse }]);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [...prev, { role: 'model', text: 'Hubo un error al conectar con el asistente. Inténtalo más tarde.' }]);
        toast({
          variant: "destructive",
          title: "Error de Conexión",
          description: "No se pudo comunicar con el asistente de IA.",
        })
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null); // Reset prev analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    startTransition(async () => {
        try {
          const response = await aiVisualAnalysisTool({ photoDataUri: selectedImage });
          const formattedResult = `**Análisis de Composición:**\n${response.compositionalElements}\n\n**Categorías Estéticas:**\n${response.aestheticCategories}\n\n**Funciones Comunicativas:**\n${response.communicativeFunctions}\n\n**Resumen General:**\n${response.overallAnalysis}`;
          setAnalysisResult(formattedResult);
        } catch (error) {
            console.error(error);
            setAnalysisResult('Error al analizar la imagen.');
            toast({
              variant: "destructive",
              title: "Error de Análisis",
              description: "No se pudo analizar la imagen con IA.",
            })
        }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-violet-500 hover:bg-violet-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
        title="Asistente IA"
      >
        <Sparkles size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-card rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-fadeIn font-body">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-4 flex justify-between items-center text-primary-foreground shrink-0">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <span className="font-bold font-headline">Asistente IA ✨</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-1 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex border-b bg-muted/50 shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === 'chat'
              ? 'text-violet-600 border-b-2 border-violet-600 bg-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <MessageSquare size={16} /> Chat Tutor
        </button>
        <button
          onClick={() => setActiveTab('vision')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === 'vision'
              ? 'text-violet-600 border-b-2 border-violet-600 bg-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ImageIcon className="h-4 w-4" /> Análisis Visual
        </button>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-background/50 custom-scrollbar">
        {activeTab === 'chat' ? (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-violet-500 text-white rounded-br-none'
                      : 'bg-card border text-foreground rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isPending && (
              <div className="flex justify-start">
                <div className="bg-muted p-2 rounded-lg animate-pulse text-muted-foreground text-xs flex items-center gap-2">
                  <Loader className="h-3 w-3 animate-spin"/> Escribiendo...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-xl border shadow-sm text-center">
              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition-colors"
                >
                  <Upload className="mx-auto text-muted-foreground mb-2" size={32} />
                  <p className="text-sm text-muted-foreground">
                    Sube una imagen para analizar su composición
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                    }}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
                  >
                    <X size={14} />
                  </button>
                  {!analysisResult && (
                    <Button onClick={handleAnalyzeImage} disabled={isPending} className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600">
                      {isPending ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      {isPending ? 'Analizando...' : 'Analizar con IA'}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {isPending && !analysisResult && (
              <div className="bg-muted p-4 rounded-xl border text-sm flex items-center justify-center gap-2">
                <Loader className="animate-spin h-4 w-4"/> Analizando imagen...
              </div>
            )}
            
            {analysisResult && (
              <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20 text-sm leading-relaxed animate-fadeIn">
                <h4 className="font-bold text-violet-700 dark:text-violet-300 mb-2 flex items-center gap-2 font-headline">
                  <Sparkles size={14} /> Análisis de IA:
                </h4>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{analysisResult}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {activeTab === 'chat' && (
        <div className="p-3 bg-card border-t flex gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Pregunta sobre la materia..."
            className="flex-1 bg-muted border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isPending}
            className="bg-violet-500 hover:bg-violet-600 shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}
