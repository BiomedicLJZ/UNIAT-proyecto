'use client';
import { Menu, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

type CourseHeaderProps = {
  courseInfo: { name: string, key: string, period: string, student: string };
  onMenuClick: () => void;
  onAudioClick: () => void;
};

export default function CourseHeader({ courseInfo, onMenuClick, onAudioClick }: CourseHeaderProps) {
  return (
    <header className="h-20 bg-card border-b flex items-center justify-between px-4 z-20 relative shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <Button onClick={onMenuClick} variant="ghost" size="icon" className="lg:hidden">
          <Menu size={24} />
        </Button>
        <Link href="/" className="flex flex-col justify-center select-none cursor-pointer">
          <span className="font-extrabold text-2xl leading-none tracking-tighter text-primary font-headline">UNIAT</span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none hidden sm:block mt-0.5">University of Advanced Technologies</span>
        </Link>
        <div className="hidden md:block h-12 w-px bg-border mx-3"></div>

        <div className="hidden md:flex flex-col justify-center gap-1">
          <div>
            <h1 className="font-bold text-sm text-foreground leading-none font-headline">{courseInfo.name}</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider leading-none mt-0.5">{courseInfo.key} • {courseInfo.period}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={onAudioClick} variant="outline" size="icon" className="rounded-full">
            <Volume2 size={20} />
        </Button>

        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-foreground leading-tight">{courseInfo.student}</p>
          <p className="text-[10px] text-green-500 font-medium flex items-center justify-end gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> En línea
          </p>
        </div>
        <Avatar>
            <AvatarFallback className="bg-primary/20 text-primary font-bold">AI</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
