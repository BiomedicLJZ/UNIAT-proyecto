'use client';
import { ChevronLeft, ChevronRight, Library, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const BotIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
);


type CourseFooterProps = {
  progress: number;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  isNextLocked: boolean;
};

export default function CourseFooter({
  progress,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
  isNextLocked
}: CourseFooterProps) {
  return (
    <footer className="h-16 bg-card border-t flex items-center justify-between px-6 z-10 shadow-sm shrink-0">
      <div className="flex items-center gap-4 w-1/4 hidden md:flex">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-headline">Progreso</span>
        <Progress value={progress} className="h-2" />
        <span className="text-xs font-bold text-foreground w-8 text-right">{progress}%</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href="https://drive.google.com/drive/folders/1Vz_Nh_sqRbrJbZS-IQsORUE6S43kqAj9?usp=share_link" target="_blank" rel="noopener noreferrer">
            <Library size={16} className="mr-2" />
            <span className="hidden sm:inline">Biblioteca</span>
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
            <a href="https://notebooklm.google.com/notebook/3b849fa3-83a6-45d6-85b5-ddfc85acbbf5" target="_blank" rel="noopener noreferrer">
                <BotIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">NotebookLM</span>
            </a>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onPrev} disabled={isPrevDisabled}>
          <ChevronLeft size={16} className="mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>
        <Button onClick={onNext} disabled={isNextDisabled}>
          <span className="hidden sm:inline">Siguiente</span>
          {isNextLocked ? <Lock size={14} className="ml-0 sm:ml-2" /> : <ChevronRight size={16} className="ml-0 sm:ml-2" />}
        </Button>
      </div>
    </footer>
  );
}
