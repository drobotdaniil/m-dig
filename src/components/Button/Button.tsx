import * as React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 5px 10px;
  background: blue;
  color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

interface Props extends React.PropsWithChildren {
  onClick: () => void;
}

export const PrimaryButton: React.FC<Props> = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);
