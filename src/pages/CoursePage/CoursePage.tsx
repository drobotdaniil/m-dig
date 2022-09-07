import * as React from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { TextField } from '../../components';
import { TopicTable } from './components/TopicTable';
import { DefaultPageLayout } from '../../layout';
import { useDispatch, useSelector } from '../../store/hooks';
import { fetchCourseInfo } from '../../store/reducers/course.reducer';
import {
  selectCourse,
  selectIsError,
  selectIsLoading,
} from '../../store/selectors/course.selector';
import { selectUserId } from '../../store/selectors/user.selector';
import { Topic } from '../../types';

const TableWrapper = styled.div`
  padding: 20px;
  border: 1px dashed silver;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: flex-end ;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const filterTopics = (topics: Topic[], searchInput: string): Topic[] =>
  topics.filter((topic) => topic.title.includes(searchInput));

const sortByFunc =
  (topics: Topic[] = []) =>
  (key: string): Topic[] => {
    if (key === 'title') {
      return [...topics].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (key === 'date') {
      return [...topics].sort((a, b) => +new Date(a.date) - +new Date(b.date));
    }

    return [];
  };

export const CoursePage: React.FC = () => {
  const { courseId = '' } = useParams();
  const dispatch = useDispatch();

  const { topics, name } = useSelector(selectCourse);
  const userId = useSelector(selectUserId);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const [sortBy, setSortBy] = React.useState('title');
  const [searchInput, setSearchInput] = React.useState('');

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchCourseInfo({ userId, courseId: Number(courseId) }));
    }
  }, [dispatch, courseId, userId]);

  const filteredResults = React.useMemo(() => {
    if (searchInput === '') {
      return sortByFunc(topics)(sortBy);
    }

    return sortByFunc(filterTopics(topics, searchInput))(sortBy);
  }, [topics, sortBy, searchInput]);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSortBy(value);
  };

  const searchTopics = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchInput(value.toUpperCase());
  };

  if (isLoading || !userId) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Something went wrong. Try again later.</>
  }

  return (
    <DefaultPageLayout>
      <p>Here is {name}</p>
      <p>Your topics for this course: </p>
      <TableWrapper>
        <ActionSection>
          <TextField
            value={searchInput}
            onChange={searchTopics}
            label={'Search'}
          />
          <div>
            Selected by:
            <select value={sortBy} onChange={handleChangeSelect}>
              <option value="title">Name</option>
              <option value="date">Date</option>
            </select>
          </div>
        </ActionSection>

        <TopicTable list={filteredResults} />
      </TableWrapper>
    </DefaultPageLayout>
  );
};
