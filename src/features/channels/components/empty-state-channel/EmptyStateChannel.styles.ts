import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import GalaxySuperDark from '@metis/assets/images/misc/galaxy-superdark.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
      backgroundImage: `url(${GalaxySuperDark})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    },
    icon: {
      color: theme.colors.green1,
    },
  })
);

export default useStyles;
