import Modal from '@metis/common/components/ui/Modal';
import { login } from '@metis/features/auth/store/auth.actions';
import { setIsConnectingToMetamask } from '@metis/features/auth/store/auth.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import PeopleIcon from '@mui/icons-material/People';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import metamaskIcon from '@metis/assets/images/misc/metamask-logo.png';
import debounce from 'just-debounce-it';
import useStyles from './SignInButton.styles';

export const SignInButton = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { isConnectingToMetamask, isCreatingAccount, hasMetamask, ethAccount } = useAppSelector(
    (state) => state.auth
  );

  const onClick = debounce(() => {
    dispatch(setIsConnectingToMetamask(true));
    dispatch(login(ethAccount));
  }, 1000);

  return (
    <>
      <LoadingButton
        loading={isConnectingToMetamask}
        fullWidth
        disabled={!hasMetamask}
        variant="contained"
        onClick={onClick}
        style={{
          height: '40px',
          width: '600px',
          minWidth: '200px',
          display: 'flex',
          flexDirection: 'row',
          fontWeight: 700,
          textTransform: 'none',
          padding: '1% 3% 1% 3%',
        }}
      >
        <span className={classes.btn}>
          {isConnectingToMetamask ? (
            <Box
              sx={{
                height: '41px',
                width: '601px',
                backgroundColor: '#403B36',
                borderRadius: '10px',
              }}
            >
              <p>Connecting to Metamask</p>
            </Box>
          ) : (
            <Box className={classes.btnContent}>
              <p>Sign In with Metamask</p>
              <Box
                component="img"
                sx={{
                  height: '35px',
                  width: '35px',
                  marginLeft: '5px',
                  '@media (max-width:500px)': {
                    // eslint-disable-line no-useless-computed-key
                    height: '25px',
                    width: '25px',
                  },
                }}
                alt="metamask-logo"
                src={metamaskIcon}
              />
            </Box>
          )}
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
