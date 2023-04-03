import { gql, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { Board } from './components/Board';
import { useCardModal } from './utils/use-card-modal';
import { ModalContext } from './lib/modal-context';
import { selectLists, selectStatus, setLists } from './lib/lists-slice';
import { useEffect } from 'react';

const QUERY_BOARDS = gql`
  query {
    getAllLists {
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
  const { data, loading } = useQuery(QUERY_BOARDS, {
    onCompleted(data) {
      dispatch(setLists(data.getAllLists));
    },
  });
  const { openModal, closeModal, Modal } = useCardModal();
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const status = useSelector(selectStatus);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <main className="min-h-screen w-full m-0 p-6 overflow-auto">
        <Loader isLoading={status === 'loading'} />
        {data && <Board fetchedLists={lists} />}
        <Modal />
      </main>
    </ModalContext.Provider>
  );
}

export default App;
