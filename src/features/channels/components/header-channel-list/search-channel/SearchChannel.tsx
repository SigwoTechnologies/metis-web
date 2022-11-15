import { setFilteredChannels } from '@metis/features/channels/store/channel.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import debounce from 'just-debounce-it';
import useStyles from '../HeaderChannelList.styles';

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
    <Grid item xs={10} className={styles.iconContainer} sx={{ height: '0 !important' }}>
      <TextField
        autoComplete="off"
        variant="standard"
        placeholder="Search Channel"
        type="text"
        onChange={({ target }) => handleChange(target.value)}
        className={styles.inputSearch}
        sx={{ display: 'flex', height: '100%' }}
      />
    </Grid>
  );
};
