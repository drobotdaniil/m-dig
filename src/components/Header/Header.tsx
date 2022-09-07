import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from '../../store/hooks';
import { fetchUser, logoutUser } from '../../store/reducers/user.reducer';
import {
  selectIsLoading,
  selectUserAvatar,
  selectUserFirstName,
  selectUserToken,
} from '../../store/selectors/user.selector';
import { PrimaryButton } from '../Button';
import { Nav } from '../Nav';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid silver;
  margin-bottom: 15px;
  padding: 20px 30px;
  height: 90px;
`;

const AvatarBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid silver;

  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
  }
`;

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector(selectUserToken);

  const name = useSelector(selectUserFirstName);
  const avatar = useSelector(selectUserAvatar);
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  React.useEffect(() => {
    if (userToken) {
      dispatch(fetchUser());
    }
  }, [dispatch, userToken]);

  return (
    <StyledHeader>
      <Nav />

      {isLoading
        ? 'Loading...'
        : name && (
            <AvatarBlock>
              {name}
              <img src={avatar} alt={name} />
              <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
            </AvatarBlock>
          )}
    </StyledHeader>
  );
};
