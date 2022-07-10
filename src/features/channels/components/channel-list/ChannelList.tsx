import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PompAvatar from 'src/assets/images/avatars/pomp.jpg';
import ReneAvatar from 'src/assets/images/avatars/rene.jpg';
import BugAvatar from 'src/assets/images/avatars/bug.jpg';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { selectState } from '../../store/channel.slice';
import { findByUser } from '../../store/channel.actions';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels } = useAppSelector(selectState);

  useEffect(() => {
    dispatch(findByUser());
  }, []);

  return (
    <>
      {channels.map((channel) => (
        <ChannelListItem
          key={channel.name}
          name={channel.name}
          message={`${channel.name} says: visit my page!: ${channel.url}`}
          date="08:34 AM"
          isRead
          avatar={channel.url}
        />
      ))}
    </>
  );
};

export default ChannelList;
