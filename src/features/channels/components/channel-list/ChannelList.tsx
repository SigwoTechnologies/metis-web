import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PlusButton from 'src/assets/images/misc/plus-button.png';
import PompAvatar from 'src/assets/images/avatars/pomp.jpg';
import ReneAvatar from 'src/assets/images/avatars/rene.jpg';
import BugAvatar from 'src/assets/images/avatars/bug.jpg';

import ChannelListItem from './channel-list-item/ChannelListItem';
import SearchChannel from './search-channel/SearchChannel';
import useStyles from './ChannelList.styles';

const ChannelList = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container} square>
      <SearchChannel />

      <List sx={{ width: '100%', mt: 4 }}>
        <ChannelListItem
          name="Metis Group"
          message="Rene Reyes: Hey @sigwo! The new version is deployed.."
          date="08:34 AM"
          avatar={ReneAvatar}
        />
        <ChannelListItem
          name="Pompilio"
          message="Please send me an update asap!"
          date="03:45 PM"
          avatar={PompAvatar}
        />
        <ChannelListItem
          name="Metis bug report"
          message="Pompilio: The landing page crashed.."
          date="07/02/2022"
          avatar={BugAvatar}
        />
        <ChannelListItem
          name="Metis Dev team"
          date="07/01/2022"
          message="sigwo[I won't DM you]: Metis web rocks!"
        />
        <ChannelListItem
          name="Jupiter Lovers"
          message="@sigwo created the channel"
          date="06/30/2022"
        />
      </List>
      <Box component="img" src={PlusButton} alt="Create Channel" className={classes.createButton} />
    </Paper>
  );
};

export default ChannelList;
