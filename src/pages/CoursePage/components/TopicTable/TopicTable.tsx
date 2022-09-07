import * as React from 'react';
import styled from 'styled-components';

import { Topic } from '../../../../types';
import { TableBody } from './TableBody';
import TableHeader from './TableHeader';

export interface Props {
  list: Topic[];
}

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;

  th,
  td {
    border: 1px solid;
  }
`;

export const TopicTable: React.FC<Props> = ({ list }) => {
  if (!list.length) {
    return <>No topics</>;
  }

  return (
    <StyledTable>
      <TableHeader />
      <TableBody list={list} />
    </StyledTable>
  );
};
