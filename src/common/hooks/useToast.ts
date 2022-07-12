import { AlertColor } from '@mui/material';
import { useAppDispatch } from 'src/store/hooks';
import { openToast, hideToast } from 'src/store/ui/toast.slice';

export default function useToast() {
  const dispatch = useAppDispatch();
  const delay = 6000;

  return {
    show: (type: AlertColor, text: string) => {
      dispatch(openToast({ text, type }));
      setTimeout(() => {
        dispatch(hideToast());
      }, delay);
    },
  };
}
