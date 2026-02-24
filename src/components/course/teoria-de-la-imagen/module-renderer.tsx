'use client';
import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  GraduationCap,
  MessageSquare,
  PartyPopper,
  PlayCircle,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfettiEffect from './confetti-effect';
import type { Module, Resource } from './types';
import { getEmbedUrl } from './utils';

const ActivityRenderer = ({ activity, isCompleted, onToggle }: { activity: any, isCompleted: boolean, onToggle: () => void }) => {
    if (!activity) return null;
    return (
        <div className={`mt-6 p-5 rounded-xl border transition-all ${isCompleted ? 'bg-green-500/10 border-green-500/20' : 'bg-muted/30'}`}>
            <h4 className="font-bold text-lg text-foreground mb-2 font-headline">{activity.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{activity.instruction}</p>
            {activity.url ? (
                <Button asChild onClick={isCompleted ? undefined : onToggle}>
                    <a href={activity.url} target="_blank" rel="noopener noreferrer">{isCompleted ? 'Ver Entrega' : 'Realizar Actividad'}</a>
                </Button>
            ) : (
                <Button onClick={onToggle}>{isCompleted ? 'Marcar como no completado' : 'Marcar como completado'}</Button>
            )}
        </div>
    );
};

const ForumRenderer = ({ forumData }: { forumData: any }) => {
    const [posts, setPosts] = useState(forumData.initialPosts || []);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><MessageSquare className="text-primary"/> {forumData.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground italic mb-4">"{forumData.question}"</p>
                <div className="space-y-4">
                    {posts.map((post:any, idx:number) => (
                        <div key={idx} className="bg-muted/50 p-3 rounded-lg text-sm">
                            <p className="font-bold text-foreground">{post.user}</p>
                            <p className="text-muted-foreground">{post.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const ModuleConclusionRenderer = ({ closingData, onPlay }: { closingData: any, onPlay: any }) => (
    <Card className="bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Award className="text-primary"/> Cierre y Conclusiones</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">{closingData.text}</p>
            {closingData.url && (
                <Button onClick={() => onPlay({ type: 'audio', title: closingData.audioTitle, url: closingData.url })}>
                    <PlayCircle className="mr-2 h-4 w-4"/> {closingData.audioTitle} ({closingData.duration})
                </Button>
            )}
        </CardContent>
    </Card>
);

const ResourceCard = ({ resource, onClick }: { resource: Resource, onClick: (res: Resource) => void }) => {
    const iconMap = {
        video: <PlayCircle className="h-5 w-5 text-red-600" />,
        pdf: <BookOpen className="h-5 w-5 text-orange-600" />,
        presentation: <BookOpen className="h-5 w-5 text-yellow-600" />,
        img: <BookOpen className="h-5 w-5 text-blue-600" />,
        default: <BookOpen className="h-5 w-5 text-gray-600" />,
    };
    
    return (
        <Card onClick={() => onClick(resource)} className="cursor-pointer hover:shadow-md transition-shadow group">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-muted p-3 rounded-lg">
                    {iconMap[resource.type as keyof typeof iconMap] || iconMap.default}
                </div>
                <div className="min-w-0">
                    <CardTitle className="text-sm font-semibold group-hover:text-primary truncate">{resource.title}</CardTitle>
                </div>
            </CardHeader>
        </Card>
    )
};


const SubtopicSection = ({ subtopic, moduleId, index, onResourceClick, isCompleted, onToggleActivity }: { subtopic: any, moduleId: string, index: number, onResourceClick: any, isCompleted: boolean, onToggleActivity: any }) => (
  <section className="relative pl-0 md:pl-8 md:border-l-2 md:border-dashed">
    <div className="hidden md:flex absolute -left-[15px] top-0 w-7 h-7 rounded-full items-center justify-center text-xs font-bold text-white shadow-sm transition-colors bg-muted-foreground">
      {index + 1}
    </div>
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-3 font-headline">{subtopic.title}</h3>
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
          {subtopic.content}
        </div>
      </div>
      {subtopic.resources && subtopic.resources.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {subtopic.resources.map((res: Resource, idx: number) => (
                <ResourceCard key={idx} resource={res} onClick={onResourceClick} />
            ))}
        </div>
      )}
      <ActivityRenderer 
        activity={subtopic.activity} 
        isCompleted={isCompleted} 
        onToggle={() => onToggleActivity(`${moduleId}-${subtopic.id}`)} />
    </div>
  </section>
);


type ModuleRendererProps = {
  module: Module;
  onResourceClick: (resource: Resource) => void;
  completedActivities: Record<string, boolean>;
  onToggleActivity: (id: string) => void;
};

export default function ModuleRenderer({
  module,
  onResourceClick,
  completedActivities,
  onToggleActivity,
}: ModuleRendererProps) {
  if (!module) return null;

  switch (module.type) {
    case 'completion':
      return (
        <div className="relative overflow-hidden min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-fadeIn">
          <ConfettiEffect />
          <div className="z-10 bg-card/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-4 border-yellow-400 max-w-2xl mx-auto transform transition-all hover:scale-105 duration-500">
            <div className="mb-6 flex justify-center">
              <div className="bg-yellow-100 p-6 rounded-full animate-bounce">
                <PartyPopper size={64} className="text-yellow-600" />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 font-headline">
              ¡Felicidades!
            </h2>
            <div className="prose-lg text-muted-foreground mb-8 whitespace-pre-line leading-relaxed">
              {module.content}
            </div>
          </div>
          {module.image && (
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <img src={module.image} alt="Celebración" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      );

    case 'presentation':
      return (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
          <div className="bg-primary/5 border-l-4 p-8 rounded-r-lg shadow-sm border-primary">
            {module.headerImage && (
              <div className="aspect-video rounded-lg overflow-hidden mb-6 shadow-sm">
                <img src={getEmbedUrl(module.headerImage) || module.headerImage} alt="Imagen de bienvenida" className="w-full h-full object-cover" />
              </div>
            )}
            <h2 className="text-4xl font-bold mb-4 text-foreground font-headline">{module.title}</h2>
            <div className="text-lg text-muted-foreground leading-relaxed mb-6">{module.content}</div>
            {module.resources && module.resources.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {module.resources.map((res, idx) => (
                        <Button key={idx} onClick={() => onResourceClick(res)} variant={res.type === 'link' ? 'link' : 'default'} asChild={res.type === 'link'}>
                            {res.type === 'link' ? <a href={res.url} target="_blank" rel="noopener noreferrer">{res.title}</a> : <>{res.title}</>}
                        </Button>
                    ))}
                </div>
            )}
          </div>
        </div>
      );

    case 'topic':
      return (
        <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
          <header className="border-b pb-6">
            <h2 className="text-4xl font-bold text-foreground mb-3 font-headline">{module.fullTitle || module.title}</h2>
            <div className="text-lg text-muted-foreground leading-relaxed">{module.content}</div>
          </header>
          <div className="space-y-16">
            {module.hasIntroVideo && (
              <div className="mb-10 animate-fadeIn">
                <div
                  onClick={() => onResourceClick({ type: 'video', title: module.introVideoTitle || `Video Introductorio: ${module.title}`, url: module.introVideoUrl! })}
                  className="cursor-pointer bg-gray-900 rounded-xl overflow-hidden relative aspect-video shadow-lg group hover:shadow-2xl transition-all border border-gray-800"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PlayCircle size={48} className="text-white fill-white/20" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-bold text-lg flex items-center gap-2">
                      <Video size={20} className="text-primary" />
                      {module.introVideoTitle || 'Ver Video Introductorio'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {module.subtopics?.map((sub, index) => (
              <SubtopicSection
                key={sub.id}
                subtopic={sub}
                moduleId={module.id}
                index={index}
                onResourceClick={onResourceClick}
                isCompleted={!!completedActivities[`${module.id}-${sub.id}`]}
                onToggleActivity={onToggleActivity}
              />
            ))}
            {module.forum && (
              <section className="relative pl-0 md:pl-8 md:border-l-2 md:border-dashed pt-8">
                <ForumRenderer forumData={module.forum} />
              </section>
            )}
            {module.closing && (
              <section className="relative pl-0 md:pl-8 pt-4 pb-8">
                <ModuleConclusionRenderer closingData={module.closing} onPlay={onResourceClick} />
              </section>
            )}
          </div>
        </div>
      );
    
    case 'closing':
        return (
            <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto py-10">
                <div className="text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap size={40} className="text-primary"/>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4 font-headline">{module.title}</h2>
                    <p className="text-lg text-muted-foreground">{module.content}</p>
                </div>
                <div className="bg-card p-6 rounded-xl border">
                    <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 font-headline">
                        <Award className="text-primary"/> Proyecto Integrador
                    </h3>
                    <p className="text-muted-foreground mb-4">{module.closingText}</p>
                    <ActivityRenderer 
                        activity={module.activity} 
                        isCompleted={!!completedActivities[module.id]} 
                        onToggle={() => onToggleActivity(module.id)} />
                </div>
            </div>
        );

    default:
      return (
        <div>
          <h2 className="text-2xl font-bold">{module.title}</h2>
          <div>{module.content}</div>
        </div>
      );
  }
}
