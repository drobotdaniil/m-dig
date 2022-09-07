import * as React from 'react';

const TableHeader: React.FC = () => (
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Type</th>
      <th>Planned Date</th>
      <th>Progress</th>
      <th>Notes</th>
    </tr>
  </thead>
);

export default React.memo(TableHeader);
