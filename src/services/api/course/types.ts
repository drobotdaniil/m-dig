export interface CourseQueryParams {
  userId: number;
  courseId: number;
}

export interface UpdatePayload {
  topicId: number;
  notes: string;
}

export type CourseUpdatePayload = CourseQueryParams & UpdatePayload;
