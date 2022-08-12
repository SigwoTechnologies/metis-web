import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.01rem',
    },
    cardContent: {
      justifyContent: 'flex-start',
      fontSize: '2rem',
    },
    actionContainer: {
      justifyContent: 'flex-end',
      padding: '0.8rem',
    },
    nothingMessage: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1rem',
      color: 'grey',
    },
  })
);

export default useStyles;
