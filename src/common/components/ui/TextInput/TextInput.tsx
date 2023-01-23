import { TextField } from '@mui/material';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';
import InputAdornment from '@mui/material/InputAdornment';
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
      sx={{
        borderRadius: '10px',
        backgroundColor: '#232323',
      }}
      InputProps={{
        className: classes.textInput,
        startAdornment: (
          <InputAdornment position="start" sx={{ marginLeft: '10px', color: '#0dc7fa29' }}>
            <CreateIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextInput;
