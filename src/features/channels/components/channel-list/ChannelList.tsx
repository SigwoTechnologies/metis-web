import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import Spinner from 'src/common/components/ui/spinner/Spinner';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { selectState } from '../../store/channel.slice';
import { findByUser } from '../../store/channel.actions';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading } = useAppSelector(selectState);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    dispatch(findByUser());
  }, []);

  return (
    <Spinner isLoading={isLoading}>
      {channels.map((channel) => (
        <ChannelListItem
          key={channel.name}
          name={channel.name}
          message={`${channel.name} says: visit my page!: ${channel.url}`}
          date="08:34 AM"
          isRead
          avatar={channel.url}
          onClick={() => setSelected(channel.name)}
          selected={selected === channel.name}
        />
      ))}
    </Spinner>
  );
};

export default ChannelList;
