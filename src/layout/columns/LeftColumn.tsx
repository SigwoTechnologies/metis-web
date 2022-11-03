import ChannelList from '@metis/features/channels/components/channel-list/ChannelList';
import { CreateChannel } from '@metis/features/channels/components/channel-list/create-channel/CreateChannel';
import SearchChannel from '@metis/features/channels/components/channel-list/search-channel/SearchChannel';
import PendingChannelsList from '@metis/features/channels/components/pending-channels-list/PendingChannelsList';
import InvitesList from '@metis/features/invites/components/InvitesList/InvitesList';
import ShowPassphrase from '@metis/features/channels/components/show-passphrase/ShowPassphrase';
import FooterSection from '../sections/FooterSection';
import HeaderSection from '../sections/HeaderSection';
import MainSection from '../sections/MainSection';

const LeftColumn = () => (
  <>
    <ShowPassphrase />
    <HeaderSection>
      <SearchChannel />
    </HeaderSection>
    <MainSection>
      <InvitesList />
      <PendingChannelsList />
      <ChannelList />
    </MainSection>
    <FooterSection>
      <CreateChannel />
    </FooterSection>
  </>
);

export default LeftColumn;
