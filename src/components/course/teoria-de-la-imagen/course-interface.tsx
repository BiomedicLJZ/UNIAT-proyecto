'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Library,
  BookOpen,
  Lock,
} from 'lucide-react';
import { COURSE_CONTENT, COURSE_INFO, SYLLABUS_CONTENT } from '@/lib/course-data/teoria-de-la-imagen';
import CourseHeader from './course-header';
import CourseFooter from './course-footer';
import ModuleRenderer from './module-renderer';
import ResourceModal from './resource-modal';
import GeminiAssistant from './gemini-assistant';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Resource } from './types';

export default function CourseInterface() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentModule = COURSE_CONTENT[currentModuleIndex];

  const progress = React.useMemo(() => {
    let total = 0;
    let completed = 0;
    COURSE_CONTENT.forEach(mod => {
      if (mod.subtopics) {
        mod.subtopics.forEach(sub => {
          if (sub.activity) {
            total++;
            if (completedActivities[`${mod.id}-${sub.id}`]) completed++;
          }
        });
      } else if (mod.activity) {
        total++;
        if (completedActivities[mod.id]) completed++;
      }
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [completedActivities]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [currentModuleIndex]);

  const handleResourceClick = (resource: Resource) => {
    if (resource.url && resource.url !== '#') {
      setSelectedResource(resource);
    }
  };

  const toggleActivity = (id: string) => {
    setCompletedActivities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-screen flex flex-col bg-background font-body text-foreground overflow-hidden">
      <CourseHeader
        courseInfo={COURSE_INFO}
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onAudioClick={() => handleResourceClick({ type: 'audio', title: 'Audio de Bienvenida', url: 'https://drive.google.com/file/d/1xVaGMkmcC0bDSWiMXcv2lK87cFhAhWaJ/view?usp=share_link' })}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <aside
          className={cn(
            'fixed lg:relative inset-y-0 left-0 z-40 bg-card border-r flex flex-col transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none',
            mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:w-72 lg:translate-x-0'
          )}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b bg-muted/30">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider font-headline">Índice del Curso</span>
            <Button onClick={() => setMobileMenuOpen(false)} variant="ghost" size="icon" className="lg:hidden">
              <X size={20} />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="p-3 space-y-1">
              {COURSE_CONTENT.map((mod, index) => {
                const isActive = currentModuleIndex === index;
                const isLocked = mod.type === 'completion' && progress < 100;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      if (!isLocked) {
                        setCurrentModuleIndex(index);
                        if (window.innerWidth < 1024) setMobileMenuOpen(false);
                      }
                    }}
                    disabled={isLocked}
                    className={cn(
                      'w-full text-left p-2.5 rounded-lg text-sm flex items-center gap-3 transition-all duration-200 group relative',
                      isActive ? 'bg-primary/10 text-primary' :
                      isLocked ? 'text-muted-foreground/50 cursor-not-allowed' :
                      'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    <div className={cn(
                      'w-2 h-2 rounded-full flex-shrink-0 transition-colors',
                      isActive ? 'bg-primary' : 'bg-border'
                    )} />
                    <span className={cn('truncate font-medium', isActive && 'font-bold')}>{mod.title}</span>
                    {isLocked && <Lock size={12} className="ml-auto opacity-50" />}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>
           <div className="p-4 border-t">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ver Programa de Materia
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-headline">Programa Académico</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-body leading-relaxed">{SYLLABUS_CONTENT}</pre>
                </ScrollArea>
              </DialogContent>
            </Dialog>
           </div>
        </aside>

        <main ref={contentRef} className="flex-1 overflow-y-auto bg-background/80 relative scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
            <div className="mb-8 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest font-headline">
              <span>Curso</span> <ChevronRight size={12} /> <span>{currentModule.title}</span>
            </div>
            <ModuleRenderer
              module={currentModule}
              onResourceClick={handleResourceClick}
              completedActivities={completedActivities}
              onToggleActivity={toggleActivity}
            />
          </div>
        </main>
      </div>

      <CourseFooter
        progress={progress}
        onPrev={() => setCurrentModuleIndex(prev => Math.max(0, prev - 1))}
        onNext={() => setCurrentModuleIndex(prev => Math.min(COURSE_CONTENT.length - 1, prev + 1))}
        isPrevDisabled={currentModuleIndex === 0}
        isNextDisabled={currentModuleIndex === COURSE_CONTENT.length - 1 || (COURSE_CONTENT[currentModuleIndex + 1]?.type === 'completion' && progress < 100)}
        isNextLocked={COURSE_CONTENT[currentModuleIndex + 1]?.type === 'completion' && progress < 100}
      />

      <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
      <GeminiAssistant currentModule={currentModule} />
      
    </div>
  );
}
