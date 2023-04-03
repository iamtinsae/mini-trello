import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { client } from '../lib/apollo';

import { CardProps } from './Card';
import { List, ListProps } from './List';
import { PlusIcon } from './Icons';
import { addList, selectLists, setLists } from '../lib/lists-slice';

const CREATE_LIST = gql`
  mutation ($title: String!) {
    createList(title: $title) {
      list {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;

const REORDER_CARDS = gql`
  mutation ($cardIds: [ID!]!, $listId: ID!) {
    reorderCards(cardIds: $cardIds, listId: $listId) {
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

const MOVE_CARD = gql`
  mutation ($listId: ID!, $cardId: ID!) {
    moveCard(listId: $listId, cardId: $cardId) {
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

export interface BoardProps {
  fetchedLists: ListProps[];
}

const reorder = (
  list: CardProps[],
  startIndex: number,
  endIndex: number
): CardProps[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: CardProps[],
  destination: CardProps[],
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: CardProps[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const Board = ({ fetchedLists: lists }: BoardProps) => {
  console.log(lists);
  const dispatch = useDispatch();

  const handleCreateList = async () => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_LIST,
        variables: {
          title: 'New List',
        },
      });

      dispatch(
        addList({
          id: data.createList.list.id,
          title: data.createList.list.title,
          cards: [],
          isEditing: true,
        })
      );
    } catch (error) {
      // --
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceIdx = parseInt(source.droppableId);
    const destinationIdx = parseInt(destination.droppableId);

    if (sourceIdx === destinationIdx) {
      const sourceList = lists.find((list) => list.id === source.droppableId);

      if (!sourceList) {
        return;
      }

      const items = reorder(sourceList.cards, source.index, destination.index);

      dispatch(
        setLists(
          lists.map((list) => {
            if (list.id === sourceList.id) {
              return {
                id: sourceList.id,
                title: sourceList.title,
                cards: items,
              };
            }

            return list;
          })
        )
      );

      await client.mutate({
        mutation: REORDER_CARDS,
        variables: {
          cardIds: items.map((item) => item.id),
          listId: sourceList.id,
        },
      });
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find(
        (list) => list.id === destination.droppableId
      );
      const card = sourceList?.cards[source.index];

      if (!sourceList || !destinationList || !card) {
        return;
      }

      const result = move(
        sourceList.cards,
        destinationList.cards,
        source,
        destination
      );

      dispatch(
        setLists(
          lists.map((list) => {
            if (list.id === sourceList.id) {
              return {
                id: sourceList.id,
                title: sourceList.title,
                cards: result[sourceIdx],
              };
            }

            if (list.id === destinationList.id) {
              return {
                id: destinationList.id,
                title: destinationList.title,
                cards: result[destinationIdx],
              };
            }

            return list;
          })
        )
      );

      await client.mutate({
        mutation: MOVE_CARD,
        variables: {
          cardId: card.id,
          listId: destinationList.id,
        },
      });

      await client.mutate({
        mutation: REORDER_CARDS,
        variables: {
          cardIds: result[destinationIdx].map((item) => item.id),
          listId: destinationList.id,
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-row gap-x-4 items-start">
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list, idx) => (
            <List
              key={list.id}
              id={list.id}
              title={list.title}
              cards={list.cards}
              isEditing={list.isEditing}
            />
          ))}
        </DragDropContext>
        <button
          className="bg-white/25 w-[272px] rounded-md py-2 px-4 hover:bg-white/50 flex items-center text-sm font-medium h-auto min-w-fit"
          onClick={handleCreateList}
        >
          <PlusIcon className="w-3 h-3 text-white mr-2 fill-white" />
          Add Another List
        </button>
      </div>
    </>
  );
};
