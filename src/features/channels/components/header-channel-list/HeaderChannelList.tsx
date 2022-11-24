import Box from '@mui/material/Box';
import { ChannelDrawer } from '../channel-drawer/ChannelDrawer';
import useStyles from './HeaderChannelList.styles';
import { SearchChannel } from './search-channel/SearchChannel';

export const HeaderChannelList = () => {
  const styles = useStyles();

  return (
    <>
      <Box className={styles.container}>
        <ChannelDrawer />
        <SearchChannel />
      </Box>
    </>
  );
};
