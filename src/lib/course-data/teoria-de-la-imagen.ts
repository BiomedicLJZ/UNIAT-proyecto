import type { Module } from '@/components/course/teoria-de-la-imagen/types';
import teoriaData from './json/teoria-de-la-imagen.json';

export const COURSE_INFO = teoriaData.courseInfo;
export const SYLLABUS_CONTENT = teoriaData.syllabusContent;
export const COURSE_CONTENT = teoriaData.modules as Module[];
