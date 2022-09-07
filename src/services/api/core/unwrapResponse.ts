import { AxiosResponse } from 'axios';

export const unwrapResponse = (response: AxiosResponse) => response.data;
