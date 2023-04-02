import { gql, useQuery } from '@apollo/client';

import { Board, BoardProps } from './components/Board';

const QUERY_BOARDS = gql`
  query {
    lists {
      id
      title
      createdAt
      updatedAt
      cards {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

function App() {
  const { data, loading, error } = useQuery(QUERY_BOARDS, {});

  return (
    <main>
      <Loader isLoading={loading} />
      <Board fetchedLists={data?.lists ?? []} />
    </main>
  );
}

export default App;
