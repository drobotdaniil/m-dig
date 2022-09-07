import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Course } from '../../types';
import { PrimaryButton } from '../Button';

const ListItem = styled.li`
  padding: 10px;
  border: 1px solid silver;
  margin-bottom: 10px;
`;

export const CourseItem: React.FC<Course> = ({ name, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/course/${id}`);
  };

  return (
    <ListItem>
      <p>Course name: {name}</p>
      <PrimaryButton onClick={handleClick}>Go to course</PrimaryButton>
    </ListItem>
  );
};
