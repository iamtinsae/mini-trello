import { clsx } from '../utils';
import { useHover, useIsMovingLeftOrRight } from '../utils/hooks';
import { PencilIcon } from './Icons';

export interface CardProps {
  id: string;
  title: string;
  isDragging?: boolean;
}
export const Card = ({ title, isDragging }: CardProps) => {
  const [ref, isHovered] = useHover();
  const [isMovingLeft, isMovingRight] = useIsMovingLeftOrRight();

  return (
    <div
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
