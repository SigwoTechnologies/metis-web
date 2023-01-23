import { setFilteredChannels } from '@metis/features/channels/store/channel.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { FilledInput } from '@mui/material';
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
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
      <SearchIcon className={styles.searchIcon} />
      <FilledInput
        id="searchIn"
        autoComplete="off"
        placeholder="Search Channel"
        type="text"
        onChange={({ target }) => handleChange(target.value)}
        className={styles.textInput}
        inputProps={{
          className: styles.formInput,
        }}
      />
    </Box>
  );
};
