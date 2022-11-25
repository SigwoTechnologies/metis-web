import { setFilteredChannels } from '@metis/features/channels/store/channel.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
// import { FormControl, InputLabel, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import debounce from 'just-debounce-it';
import useStyles from './SearchChannel.styles';

export const SearchChannel = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { filteredChannels } = useAppSelector((state) => state.channel);

  const handleChange = debounce((value: string) => {
    dispatch(setFilteredChannels(value));
    if (!filteredChannels.length && value.length) {
      dispatch(openToast({ text: 'Channel not found!', type: 'error' }));
    }
  }, 500);
  return (
    <TextField
      autoComplete="off"
      variant="standard"
      placeholder="Search Channel"
      type="text"
      onChange={({ target }) => handleChange(target.value)}
      className={styles.inputSearch}
      sx={{ paddingTop: '0 !important', marginLeft: '20px', borderRadius: '10px' }}
      InputProps={{
        className: styles.textInput,
        startAdornment: (
          <InputAdornment position="start" sx={{ marginLeft: '10px', color: '#0dc7fa29' }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
