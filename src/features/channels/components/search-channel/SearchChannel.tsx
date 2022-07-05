import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';

const ChannelList = () => (
  <FormControl sx={{ mt: 5 }} variant="standard" fullWidth>
    <InputLabel>Search</InputLabel>
    <Input
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="search in channels">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

export default ChannelList;
