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
  content: React.ReactNode;
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

type BaseModule = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type PresentationModule = BaseModule & {
  type: 'presentation';
  headerImage?: string;
  resources?: Resource[];
};

export type TopicModule = BaseModule & {
  type: 'topic';
  fullTitle?: string;
  description?: string;
  introVideo?: {
    title: string;
    url: string;
  };
  subtopics: Subtopic[];
  forum?: Forum;
  closing?: Closing;
};

export type ClosingModule = BaseModule & {
  type: 'closing';
  closingText: string;
  activity: Activity;
};

export type CompletionModule = BaseModule & {
  type: 'completion';
  image?: string;
};

export type Module =
  | PresentationModule
  | TopicModule
  | ClosingModule
  | CompletionModule;
