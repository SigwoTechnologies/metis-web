import Box from '@mui/material/Box';
import PlusButton from 'src/assets/images/misc/plus-button.png';

import useStyles from './CreateButton.styles';

const CreateButton = () => {
  const classes = useStyles();
  return (
    <Box component="img" src={PlusButton} alt="Create Channel" className={classes.createButton} />
  );
};

export default CreateButton;
