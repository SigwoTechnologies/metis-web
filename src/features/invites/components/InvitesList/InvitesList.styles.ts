import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    accordionSum: {
      padding: '1% 4% !important',
      borderRadius: '10px',
      border: '1px solid transparent',
      backgroundColor: '#332F2E',
      minHeight: '58px !important',
      maxHeight: '58px !important',
      transition: 'ease-in-out 200ms',
    },
  })
);

export default useStyles;
