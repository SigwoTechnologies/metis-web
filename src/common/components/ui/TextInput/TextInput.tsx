/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import useStyles from './TextInput.styles';

type props = {
  register?: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  error?: FieldError;
};

const TextInput = ({ register, name, label, error, ...rest }: props) => {
  const classes = useStyles();
  const registerProp = register && register(name);

  return (
    <TextField
      className={classes.textField}
      label={label}
      variant="standard"
      error={!!error}
      helperText={error?.message}
      {...registerProp}
      {...rest}
    />
  );
};

export default TextInput;
