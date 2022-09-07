import * as React from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../../store/hooks';

import { updateCourseInfo } from '../../../../store/reducers/course.reducer';
import { selectUserId } from '../../../../store/selectors/user.selector';

interface Props {
  id: number;
  notes: string;
}

export const NoteCell: React.FC<Props> = ({ id, notes }) => {
  const dispatch = useDispatch();
  const { courseId = '' } = useParams();
  const [notesValue, setNotesValue] = React.useState(notes);

  const userId = useSelector(selectUserId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotesValue(event.currentTarget.value);
  };

  const handleSaveNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (notesValue) {
      dispatch(
        updateCourseInfo({
          courseId: Number(courseId),
          notes: event.currentTarget.value,
          userId,
          topicId: id,
        })
      );
    }
  };

  return (
    <td>
      <input
        onChange={handleChange}
        type="text"
        value={notesValue}
        onBlur={handleSaveNote}
      />
    </td>
  );
};
