export interface ListType {
  id: string;
  title: string;
  cards: CardType[];
  createdAt?: string;
  updatedAt?: string;
  isEditing?: boolean;
}
export interface CardType {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  isDragging?: boolean;
}
