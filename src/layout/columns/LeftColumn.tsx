import ChannelList from '@metis/features/channels/components/channel-list/ChannelList';
import CreateButton from '@metis/features/channels/components/channel-list/create-channel/CreateButton';
import SearchChannel from '@metis/features/channels/components/channel-list/search-channel/SearchChannel';
import PendingChannelsList from '@metis/features/channels/components/pending-channels-list/PendingChannelsList';
import InvitesList from '@metis/features/invites/components/InvitesList/InvitesList';
import FooterSection from '../sections/FooterSection';
import HeaderSection from '../sections/HeaderSection';
import MainSection from '../sections/MainSection';

const LeftColumn = () => (
  <>
    <HeaderSection>
      <SearchChannel />
    </HeaderSection>
    <MainSection>
      <InvitesList />
      <PendingChannelsList />
      <ChannelList />
    </MainSection>
    <FooterSection>
      <CreateButton />
    </FooterSection>
  </>
);

export default LeftColumn;
