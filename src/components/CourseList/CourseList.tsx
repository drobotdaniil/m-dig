import * as React from 'react';

import { Course } from '../../types';
import { CourseItem } from '../CourseItem';

interface Props {
  list: Course[];
}

export const CourseList: React.FC<Props> = ({ list }) => {
  return (
    <ul>
      {list.map((course) => (
        <CourseItem {...course} key={course.id} />
      ))}
    </ul>
  );
};
