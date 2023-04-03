import { useState, Fragment, useRef, useEffect } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { CardProps } from '../components/Card';
import { CloseIcon } from '../components/Icons';
import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import { removeCard, updateCard } from '../lib/lists-slice';

const DELETE_CARD = gql`
  mutation ($id: ID!) {
    deleteCard(id: $id) {
      deleted
    }
  }
`;

const UPDATE_CARD = gql`
  mutation ($title: String!, $description: String!, $id: ID!) {
    updateCard(title: $title, description: $description, id: $id) {
      card {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const useCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState<CardProps | null>(null);

  const openModal = (card: CardProps) => {
    setIsOpen(true);
    setCard(card);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCard(null);
  };

  const Modal = () => {
    const [title, setTitle] = useState(card?.title);
    const [description, setDescription] = useState(card?.description);
    const [mutationType, setMutationType] = useState<
      'deleting' | 'updating' | null
    >(null);

    const titleRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const handleDeleteCard = async () => {
      if (!card) return;
      setMutationType('deleting');

      await client.mutate({
        mutation: DELETE_CARD,
        variables: {
          id: card.id,
        },
      });

      dispatch(removeCard(card.id));

      setMutationType(null);
      closeModal();
    };

    const handleUpdateCard = async () => {
      if (!card) return;
      setMutationType('updating');

      const { data } = await client.mutate({
        mutation: UPDATE_CARD,
        variables: {
          id: card.id,
          title,
          description,
        },
      });

      dispatch(
        updateCard({
          cardId: card.id,
          card: data.updateCard.card,
        })
      );
      setMutationType(null);
      closeModal();
    };

    return (
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Dialog onClose={() => setIsOpen(false)} className="z-50">
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
          <div className="fixed inset-0 flex justify-center p-4 h-fit">
            <Dialog.Panel className="bg-gray-100 text-gray-800 mt-12 rounded max-w-3xl w-full p-4">
              <Dialog.Title className="flex items-start justify-between">
                <div className="relative w-full mr-4">
                  <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
                    <label htmlFor="title" className="sr-only">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="description" className="sr-only">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      name="description"
                      id="description"
                      className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Write a description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols={30}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    {card?.createdAt && (
                      <div className="text-xs text-gray-500">
                        Created at {new Date(card.createdAt).toDateString()}
                      </div>
                    )}
                    {card?.updatedAt && (
                      <div className="text-xs text-gray-500">
                        Last updated at{' '}
                        {new Date(card.updatedAt).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true,
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="mt-2">
                  <CloseIcon className="h-4 w-4" />
                </button>
              </Dialog.Title>
              <Dialog.Description
                className="flex justify-end mt-4 gap-x-3 mr-8"
                as="div"
              >
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={handleDeleteCard}
                >
                  {mutationType === 'deleting' ? 'Deleting...' : 'Delete Card'}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleUpdateCard}
                >
                  {mutationType === 'updating'
                    ? 'Saving changes...'
                    : 'Save Changes'}
                </button>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return { openModal, closeModal, Modal };
};
