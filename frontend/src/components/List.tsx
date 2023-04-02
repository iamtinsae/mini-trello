import { gql } from '@apollo/client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';

import { clsx } from '../utils';
import { ThreeDotsIcon } from './Icons';
import { Card, CardProps } from './Card';
import { useLostFocus } from '../utils/hooks';
import { client } from '../lib/apollo';

export interface ListProps {
  id: string;
  title: string;
  cards: CardProps[];
  isEditing?: boolean;
  updateList?: (props: ListProps) => void;
  deleteList?: (id: string) => void;
}

const UPDATE_LIST = gql`
  mutation ($title: String!, $id: ID!) {
    updateList(title: $title, id: $id) {
      list {
        id
        title
        cards {
          id
          title
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_CARD = gql`
  mutation ($title: String!, $description: String!, $listId: ID!) {
    createCard(title: $title, description: $description, listId: $listId) {
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

const DELETE_LIST = gql`
  mutation ($id: ID!) {
    deleteList(id: $id) {
      deleted
    }
  }
`;

export const List = ({
  id,
  title,
  cards,
  isEditing,
  updateList,
  deleteList,
}: ListProps) => {
  const [enabled, setEnabled] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const lostFocus = useLostFocus(titleInputRef);
  const [createCard, setCreateCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleTitleChange = async () => {
    const { data } = await client.mutate({
      mutation: UPDATE_LIST,
      variables: {
        title: titleInputRef.current?.value,
        id,
      },
    });

    updateList?.({
      ...data.updateList.list,
    });
  };

  const handleDeleteList = async () => {
    console.log(id);
    const resp = await client.mutate({
      mutation: DELETE_LIST,
      variables: {
        id,
      },
    });

    deleteList?.(id);
  };

  const handleCreateCard = async () => {
    const { data } = await client.mutate({
      mutation: CREATE_CARD,
      variables: {
        title: cardTitle,
        description: '',
        listId: id,
      },
    });

    setCardTitle('');
    setCreateCard(false);

    updateList?.({
      id,
      title,
      cards: [
        ...cards,
        {
          ...data.createCard.card,
        },
      ],
    });
  };

  useEffect(() => {
    if (lostFocus) {
      handleTitleChange();
    }
  }, [lostFocus]);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={id} key={id}>
      {(provided: DroppableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-[272px] rounded bg-[#ebecf0]"
        >
          <div className="w-[272px] rounded bg-[#ebecf0]">
            <div className="p-1 text-gray-900 flex justify-between">
              {isEditing ? (
                <input
                  ref={titleInputRef}
                  type="text"
                  className="w-full rounded bg-white shadow-sm ring-indigo-500 ring-2 select-none transform transition-all px-2 outline-none text-sm cursor-text"
                  defaultValue={title}
                />
              ) : (
                <span className="font-medium text-sm px-3 py-2">{title}</span>
              )}
              <Menu as="div" className="relative inline-block text-left z-50">
                <Menu.Button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300">
                  <ThreeDotsIcon className="w-4 h-4" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-[100%-14rem] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={clsx(
                              active ? 'bg-gray-100' : '',
                              'w-full rounded text-left hover:bg-gray-300 py-2 px-3 text-gray-900 font-medium text-xs'
                            )}
                          >
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={clsx(
                              active ? 'bg-gray-100' : '',
                              'w-full rounded text-left hover:bg-gray-300 py-2 px-3 text-gray-900 font-medium text-xs'
                            )}
                            onClick={handleDeleteList}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="py-2 px-2 flex flex-col gap-y-2 text-gray-900 font-medium text-sm">
              {cards.map((card, idx) => (
                <Draggable key={card.id} draggableId={card.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {createCard ? (
                <div className="">
                  <textarea
                    className="w-full rounded bg-white shadow-lg select-none transform transition-all p-2 outline-none text-sm cursor-text"
                    value={cardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                  />
                  <div className="flex justify-start gap-x-2 mt-2">
                    <button
                      className="rounded bg-indigo-600 text-white text-left hover:bg-indigo-700 py-2 px-3 font-medium text-xs"
                      onClick={handleCreateCard}
                    >
                      Add Card
                    </button>
                    <button
                      className="rounded bg-gray-300 text-gray-800 text-left hover:bg-gray-400 py-2 px-3 font-medium text-xs"
                      onClick={() => setCreateCard(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="w-full rounded text-left hover:bg-gray-300 py-2 px-3 text-gray-900 font-medium text-xs"
                  onClick={() => setCreateCard(true)}
                >
                  Add New Card
                </button>
              )}
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
