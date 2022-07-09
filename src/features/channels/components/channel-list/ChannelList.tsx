import PompAvatar from '../../../../assets/images/avatars/pomp.jpg';
import ReneAvatar from '../../../../assets/images/avatars/rene.jpg';
import BugAvatar from '../../../../assets/images/avatars/bug.jpg';

import ChannelListItem from './channel-list-item/ChannelListItem';

const ChannelList = () => (
  <>
    <ChannelListItem
      name="Metis Group"
      message="Rene Reyes: Hey @sigwo! The new version is deployed.."
      date="08:34 AM"
      isRead
      avatar={ReneAvatar}
    />
    <ChannelListItem
      name="Pompilio"
      message="Please send me an update asap!"
      date="03:45 PM"
      isRead
      avatar={PompAvatar}
    />
    <ChannelListItem
      name="Metis bug report"
      message="Pompilio: The landing page crashed.."
      date="07/02/2022"
      isRead={false}
      avatar={BugAvatar}
    />
    <ChannelListItem
      name="Metis Dev team"
      date="07/01/2022"
      isRead={false}
      message="sigwo[I won't DM you]: Metis web rocks!"
    />
    <ChannelListItem
      name="Jupiter Lovers"
      message="@sigwo created the channel"
      date="06/30/2022"
      isRead
    />
  </>
);

export default ChannelList;
