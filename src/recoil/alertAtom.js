import { atom } from 'recoil';

export const alertAtom = atom({
  key: 'alertAtom',
  default: {
    open: false,
    message: '',
    severity: 'info', // mui 규칙 "info", "success", "warning", "error"
  },
});
