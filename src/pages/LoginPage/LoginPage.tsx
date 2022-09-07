import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from '../../components';
import { useDispatch, useSelector } from '../../store/hooks';
import { loginUser } from '../../store/reducers/user.reducer';
import {
  selectIsError,
  selectIsLoading,
  selectUserFirstName,
} from '../../store/selectors/user.selector';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userFirstName = useSelector(selectUserFirstName);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const handleLogin = () => {
    dispatch(loginUser());
  };

  React.useEffect(() => {
    if (userFirstName) {
      navigate('/profile');
    }
  }, [navigate, userFirstName]);

  if (isError) {
    return <>Something went wrong. Please reload the page and try again.</>;
  }

  return (
    <div>
      {isLoading ? (
        'Trying to login...'
      ) : (
        <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
      )}
    </div>
  );
};
