import * as React from 'react';

import { CourseList } from '../../components';

import { DefaultPageLayout } from '../../layout';
import { useSelector } from '../../store/hooks';
import {
  selectUserCourses,
  selectIsLoading,
} from '../../store/selectors/user.selector';

export const ProfilePage: React.FC = () => {
  const courses = useSelector(selectUserCourses);
  const isLoading = useSelector(selectIsLoading);

  return (
    <DefaultPageLayout>
      <p>Welcome student</p>
      <p>Here is you courses list which you are assigned to:</p>
      {isLoading ? 'Loading...' : <CourseList list={courses} />}
    </DefaultPageLayout>
  );
};
