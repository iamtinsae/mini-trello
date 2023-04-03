import { useContext } from 'react';
import { clsx } from '../utils';
import { useHover, useIsMovingLeftOrRight } from '../utils/hooks';
import { PencilIcon } from './Icons';
import { ModalContext } from '../lib/modal-context';
import { CardType } from '../lib/types';

export interface CardProps extends CardType {}

export const Card = ({
  id,
  title,
  isDragging,
  description,
  createdAt,
  updatedAt,
}: CardProps) => {
  const [ref, isHovered] = useHover();
  const [isMovingLeft, isMovingRight] = useIsMovingLeftOrRight();
  const { openModal, closeModal } = useContext(ModalContext);

  return (
    <div
      onClick={() =>
        openModal({ id, title, description, createdAt, updatedAt })
      }
      ref={ref}
      className={clsx(
        'w-full rounded bg-white shadow-sm cursor-pointer hover:bg-gray-100 select-none transform transition-all',
        isDragging
          ? isMovingLeft
            ? '-rotate-12'
            : isMovingRight
            ? 'rotate-12'
            : ''
          : ''
      )}
    >
      <div className="py-2 px-3 text-gray-900 flex justify-between">
        <span className="font-medium text-sm">{title}</span>
        {isHovered && <PencilIcon />}
      </div>
    </div>
  );
};
