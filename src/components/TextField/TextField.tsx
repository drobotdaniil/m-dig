import * as React from 'react';

import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid silver;
  height: 30px;
  padding: 2px 10px;  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  label {
    margin-bottom: 10px;
  }
`;

interface Props {
  value: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TextField: React.FC<Props> = ({ value, label, onChange }) => {
  return (
    <InputWrapper>
      <label>{label}</label>
      <StyledInput value={value} onChange={onChange} placeholder="Start typing..."/>
    </InputWrapper>
  );
};
