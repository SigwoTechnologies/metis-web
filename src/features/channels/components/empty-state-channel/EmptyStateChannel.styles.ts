import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#000',
    },
    icon: {
      color: theme.colors.green1,
    },
  })
);

export default useStyles;
