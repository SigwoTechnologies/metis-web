import Modal from '@metis/common/components/ui/Modal';
import { login } from '@metis/features/auth/store/auth.actions';
import { setIsConnectingToMetamask } from '@metis/features/auth/store/auth.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import PeopleIcon from '@mui/icons-material/People';
import { LoadingButton } from '@mui/lab';
import React, { useRef } from 'react';
import useStyles from './SignInButton.styles';

export const SignInButton = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { isConnectingToMetamask, isCreatingAccount, hasMetamask, ethAccount } = useAppSelector(
    (state) => state.auth
  );

  // eslint-disable-next-line no-undef
  const debounceRef = useRef<NodeJS.Timeout>();

  const onClick = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(setIsConnectingToMetamask(true));
      dispatch(login(ethAccount));
    }, 500);
  };

  return (
    <>
      <LoadingButton
        loading={isConnectingToMetamask}
        fullWidth
        disabled={!hasMetamask}
        variant="contained"
        onClick={onClick}
        style={{
          width: '20rem',
        }}
      >
        <span className={classes.span}>
          {isConnectingToMetamask ? 'Connecting to Metamask' : 'Sign In with Metamask'}
        </span>
      </LoadingButton>

      <Modal open={isCreatingAccount}>
        <div className={classes.iconContainer}>
          <PeopleIcon className={classes.icon} color="primary" />
        </div>
        <div className={classes.loading}>We&apos;re creating your new account...</div>
      </Modal>
    </>
  );
};
