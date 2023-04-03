import { createContext } from 'react';
import { CardProps } from '../components/Card';

export const ModalContext = createContext<{
  openModal: (card: CardProps) => void;
  closeModal: () => void;
}>({
  openModal: (card: CardProps) => {},
  closeModal: () => {},
});
