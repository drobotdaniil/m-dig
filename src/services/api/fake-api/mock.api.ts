import { createServer, Response } from 'miragejs';

import { Progress, User } from '../../../types';
import { UserResponse } from '../user';

const fetchUser = (): User => ({
  id: 1,
  firstName: 'John',
  avatar:
    'https://gravatar.com/avatar/0953f2ee1c19f8e51723babc53baf642?s=400&d=robohash&r=x',
  courses: [
    {
      id: 1,
      name: 'Front end',
    },
    {
      id: 2,
      name: 'Back end',
    },
  ],
});

const loginUser = (): UserResponse => ({
  user: {
    ...fetchUser(),
  },
  token: 'token',
});

let courses = [
  {
    id: 1,
    name: 'Front end',
    topics: [
      {
        id: 1,
        date: '01-23-22',
        description: 'markup',
        title: 'HTML',
        status: Progress.PASSED,
        type: 'lecture',
        notes: '',
      },
      {
        id: 2,
        date: '01-22-22',
        description: 'programming language',
        title: 'JS',
        status: Progress.PASSED,
        type: 'practice',
        notes: '',
      },
      {
        id: 3,
        date: '01-24-22',
        description: 'programming language',
        title: 'CSS',
        status: Progress.UPCOMING,
        type: 'practice',
        notes: '',
      },
      {
        id: 4,
        date: '01-30-22',
        description: 'programming language',
        title: 'Ruby',
        status: Progress.UPCOMING,
        type: 'practice',
        notes: '',
      },
      {
        id: 5,
        date: '01-28-22',
        description: 'framework',
        title: 'ReactJS',
        status: Progress.UPCOMING,
        type: 'practice',
        notes: '',
      },
    ],
  },
  {
    id: 2,
    name: 'Back end',
    topics: [
      {
        id: 1,
        date: '02-11-22',
        description: 'programming language',
        title: 'C#',
        status: Progress.UPCOMING,
        type: 'lecture',
        notes: '',
      },
      {
        id: 2,
        date: '02-10-22',
        description: 'programming language',
        title: 'JAVA',
        status: Progress.PASSED,
        type: 'lecture',
        notes: '',
      },
    ],
  },
];

export const setupServer = (): void => {
  createServer({
    urlPrefix: '/api',
    timing: 500,
    routes() {
      this.get(
        '/user/profile',
        () => new Response(200, undefined, fetchUser())
      );
      this.post('/user/login', () => new Response(200, undefined, loginUser()));
      this.delete('/user/logout', () => new Response(204, undefined));

      this.get(
        '/courses',
        (_scheme, request) =>
          courses.find(
            (course) => course.id === Number(request.queryParams?.courseId)
          )!
      );
      this.put('/courses', (_scheme, request) => {
        const {
          data: { body },
          params,
        } = JSON.parse(request.requestBody);

        const { topicId, notes } = body;

        courses = courses.map((course) =>
          course.id === params.courseId
            ? {
                ...course,
                topics: [
                  ...course.topics.map((topic) =>
                    topic.id === topicId ? { ...topic, notes } : topic
                  ),
                ],
              }
            : course
        );

        return courses.find((course) => course.id === params.courseId)!;
      });
    },
  });
};
