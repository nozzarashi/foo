import type { SortingT } from '@/types/FilterStateT';

export const statuses: SortingT[] = [
  {
    name: 'Все',
    value: 'all',
  },
  {
    name: 'Пройдено',
    value: 'completed',
  },
  {
    name: 'Играю',
    value: 'in progress',
  },
  {
    name: 'Хочу поиграть',
    value: 'in planning',
  },
  {
    name: 'Бросил',
    value: 'dropped',
  },
];
