import axios from 'axios';
import { FullCourse } from '../../../types';

import { unwrapResponse } from '../core/unwrapResponse';
import { CourseQueryParams, UpdatePayload } from './types';

export class CourseApi {
  public getCourseInfo = async (
    params: CourseQueryParams
  ): Promise<FullCourse> => {
    return axios.get('/api/courses', { params }).then(unwrapResponse);
  };

  public setNote = async (
    params: CourseQueryParams,
    body: UpdatePayload
  ): Promise<FullCourse> => {
    return axios
      .put('/api/courses', { params, data: { body } })
      .then(unwrapResponse);
  };
}

export const courseApi = new CourseApi();
