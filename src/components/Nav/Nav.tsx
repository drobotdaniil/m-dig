import * as React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: black;
`;

export const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <StyledLink to={'/profile'}>Profile</StyledLink>
        </li>
      </ul>
    </nav>
  );
};
