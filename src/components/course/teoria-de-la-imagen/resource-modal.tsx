'use client';
import React from 'react';
import {
  X,
  FileText,
  Headphones,
  Video,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { getEmbedUrl } from './utils';
import type { Resource } from './types';
import { Button } from '@/components/ui/button';

const ImageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
);

const FileBarChart = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-4" /><path d="M8 18v-2" /><path d="M16 18v-6" /></svg>
);

const ResourceIcon = ({ type, className }: { type: Resource['type'], className?: string }) => {
  const props = { className: className || "h-4 w-4" };
  switch (type) {
    case 'video': return <Video {...props} />;
    case 'img': return <ImageIcon {...props} />;
    case 'audio': return <Headphones {...props} />;
    case 'link': return <ExternalLink {...props} />;
    case 'presentation': return <FileBarChart {...props} />;
    default: return <FileText {...props} />;
  }
};

const ResourceModal = ({
  resource,
  onClose,
}: {
  resource: Resource | null;
  onClose: () => void;
}) => {
  if (!resource) return null;
  const embedUrl = getEmbedUrl(resource.url);

  const iconBgColor =
    resource.type === 'video' ? 'bg-red-500/20 text-red-500' :
    resource.type === 'img' ? 'bg-blue-500/20 text-blue-500' :
    resource.type === 'audio' ? 'bg-purple-500/20 text-purple-500' :
    resource.type === 'link' ? 'bg-green-500/20 text-green-500' :
    resource.type === 'presentation' ? 'bg-orange-500/20 text-orange-500' :
    'bg-muted text-muted-foreground';

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex flex-col animate-fadeIn backdrop-blur-sm">
      <header className="h-16 bg-black/50 flex items-center justify-between px-4 md:px-6 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`p-2 rounded-full ${iconBgColor}`}>
            <ResourceIcon type={resource.type} className="h-5 w-5" />
          </div>
          <span className="text-white font-medium truncate font-headline">{resource.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {embedUrl && resource.url && (
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Abrir en nueva pestaña
              </a>
            </Button>
          )}
          <Button onClick={onClose} variant="secondary">
            <X className="h-4 w-4 mr-2" /> Cerrar
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full bg-neutral-900/80 relative flex items-center justify-center overflow-hidden p-4 md:p-8">
        {embedUrl ? (
          <div className="w-full h-full max-w-6xl bg-black rounded-lg shadow-2xl overflow-hidden border border-white/10 relative">
            <iframe
              src={embedUrl}
              title={resource.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No se pudo cargar la vista previa.</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Abrir recurso directamente
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResourceModal;
