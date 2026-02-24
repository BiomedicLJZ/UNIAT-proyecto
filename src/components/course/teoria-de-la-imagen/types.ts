import type { ContentBlock } from '@/components/course/shared/content-block-renderer';

export type Resource = {
  type: 'pdf' | 'video' | 'presentation' | 'audio' | 'img' | 'link';
  title: string;
  url: string;
  context?: string;
};

export type Activity = {
  type: 'upload' | 'exam' | 'text';
  title: string;
  instruction: string;
  url?: string;
};

export type Subtopic = {
  id: string;
  title: string;
  content: ContentBlock[];
  resources?: Resource[];
  activity?: Activity;
};

export type Forum = {
  title: string;
  question: string;
  initialPosts: { user: string; text: string; time: string }[];
};

export type Closing = {
  text: string;
  audioTitle: string;
  duration: string;
  url?: string;
  type?: 'video' | 'audio';
  additionalAudioTitle?: string;
  additionalAudioUrl?: string;
  additionalAudioDuration?: string;
};

export type Module = {
  id: string;
  title: string;
  fullTitle?: string;
  type: 'presentation' | 'topic' | 'closing' | 'completion';
  description?: string;
  headerImage?: string;
  content: ContentBlock[];
  hasIntroVideo?: boolean;
  introVideoTitle?: string;
  introVideoUrl?: string;
  resources?: Resource[];
  subtopics?: Subtopic[];
  forum?: Forum;
  closing?: Closing;
  closingText?: string;
  activity?: Activity;
  image?: string;
};
