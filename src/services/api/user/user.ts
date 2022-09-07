import axios from 'axios';

import { User } from '../../../types';
import { unwrapResponse } from '../core/unwrapResponse';
import { UserResponse } from './types';

export class UserApi {
  public login = async (): Promise<UserResponse> => {
    const data = await axios.post('/api/user/login').then(unwrapResponse);
    localStorage.setItem('userToken', data.token);

    return data;
  };

  public logOut = async (token: string): Promise<null> => {
    localStorage.removeItem('userToken');

    return await axios.delete('/api/user/logout', { data: token });
  };

  public getUserData = async (): Promise<User> => {
    return await axios.get('/api/user/profile').then(unwrapResponse);
  };
}

export const userApi = new UserApi();
