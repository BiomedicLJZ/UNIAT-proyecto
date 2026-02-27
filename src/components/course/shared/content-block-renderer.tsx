import React from 'react';

export type ContentBlock =
  | { type: 'heading'; text: string; level?: 2 | 3 | 4 }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; cite?: string };

export function ContentBlockRenderer({
  blocks,
  className,
}: {
  blocks: ContentBlock[];
  className?: string;
}) {
  return (
    <div className={className}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const HeadingTag = `h${block.level ?? 3}` as keyof React.JSX.IntrinsicElements;
            return (
              <HeadingTag
                key={index}
                className="font-bold text-foreground mb-3 mt-6 first:mt-0 font-headline"
              >
                {block.text}
              </HeadingTag>
            );
          }
          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul';
            return (
              <ListTag
                key={index}
                className={`mb-4 ml-5 space-y-2 text-muted-foreground ${block.ordered ? 'list-decimal' : 'list-disc'}`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ListTag>
            );
          }
          case 'quote':
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary/50 pl-4 py-1 italic text-muted-foreground mb-4"
              >
                “{block.text}”
                {block.cite && (
                  <footer className="text-xs not-italic text-muted-foreground/80 mt-2">
                    — {block.cite}
                  </footer>
                )}
              </blockquote>
            );
          case 'paragraph':
          default:
            return (
              <p key={index} className="mb-4 leading-relaxed text-muted-foreground text-justify">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
