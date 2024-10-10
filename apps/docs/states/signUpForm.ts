import { SignUp } from '@/types/types';
import { atom } from 'recoil';

export const formDataAtom = atom<SignUp>({
  key: 'formData', // Unique ID (with respect to other atoms/selectors)
  default: {
    email: '',
    name: '',
    cellPh:'',
    password:''

  }, // Default value (aka initial value)
});