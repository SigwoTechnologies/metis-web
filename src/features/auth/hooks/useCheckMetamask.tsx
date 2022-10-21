import { useAppDispatch } from '@metis/store/hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { setHasMetamask } from '../store/auth.slice';

const MetamaskNotice = () => (
  <div>
    You need metamask to use Metis.
    <a
      href="https://metamask.io/"
      style={{
        display: 'flex',
        border: '1px solid',
        color: '#fff',
        padding: '5px',
        margin: '0.5rem 1rem 0 1rem',
        justifyContent: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
      }}
      target="_blank"
      rel="noreferrer"
    >
      Install Metamask
    </a>
  </div>
);

export function useCheckMetamask() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!window.ethereum) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
    }
    if (window.ethereum) {
      dispatch(setHasMetamask(true));
    }
  }, [window.ethereum]);
}
