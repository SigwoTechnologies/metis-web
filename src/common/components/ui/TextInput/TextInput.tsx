import { TextField } from '@mui/material';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import useStyles from './TextInput.styles';

type props = {
  register?: UseFormRegister<FieldValues>;
  name: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  type?: string;
};

const TextInput = ({ register, name, label, error, placeholder, type, ...rest }: props) => {
  const classes = useStyles();
  const registerProp = register && register(name);

  return (
    <TextField
      autoComplete="off"
      className={classes.textField}
      label={label}
      placeholder={placeholder}
      variant="standard"
      error={!!error}
      type={type}
      helperText={error?.message}
      {...registerProp}
      {...rest}
    />
  );
};

export default TextInput;
