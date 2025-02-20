import { atom } from 'recoil';

export const boardAtom = atom({
  key: 'boardAtom',
  default: {
    todoList: [],
    selected: [],
    select: { idx: 1, title: '최신 순', ascending: false },
    search: '',
  },
});
