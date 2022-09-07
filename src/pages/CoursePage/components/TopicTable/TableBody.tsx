import * as React from 'react';

import { NoteCell } from './NoteCell';
import { Props } from './TopicTable';

export const TableBody: React.FC<Props> = ({ list }) => (
  <tbody>
    {list.map(({ id, title, description, date, status, type, notes }) => (
      <tr key={id}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{type}</td>
        <td>{date}</td>
        <td>{status}</td>
        <NoteCell id={id} notes={notes} />
      </tr>
    ))}
  </tbody>
);
