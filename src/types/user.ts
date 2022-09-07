import { Course } from './course';

export interface User {
  id: number;
  firstName: string;
  avatar: string;
  courses: Course[];
}
