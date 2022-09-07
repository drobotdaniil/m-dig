export enum Progress {
  PASSED = 'PASSED',
  UPCOMING = 'UPCOMING',
}

type TopicType = 'practice' | 'lecture';

export interface Topic {
  id: number;
  title: string;
  date: string;
  description: string;
  type: TopicType;
  status: Progress;
  notes: string;
}

export interface Course {
  id: number;
  name: string;
}

export interface FullCourse extends Course {
  topics: Topic[];
}
