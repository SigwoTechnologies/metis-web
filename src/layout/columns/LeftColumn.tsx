import ChannelList from '@metis/features/channels/components/channel-list/ChannelList';
import { CreateChannel } from '@metis/features/channels/components/channel-list/create-channel/CreateChannel';
import { HeaderChannelList } from '@metis/features/channels/components/header-channel-list/HeaderChannelList';
import PendingChannelsList from '@metis/features/channels/components/pending-channels-list/PendingChannelsList';
import ShowPassphrase from '@metis/features/channels/components/show-passphrase/ShowPassphrase';
import InvitesList from '@metis/features/invites/components/InvitesList/InvitesList';
import FooterSection from '../sections/FooterSection';
import MainSection from '../sections/MainSection';

const LeftColumn = () => (
  <>
    <ShowPassphrase />
    <HeaderChannelList />
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
