import SearchChannel from '@metis/features/channels/components/channel-list/search-channel/SearchChannel';
import ChannelList from '@metis/features/channels/components/channel-list/ChannelList';
import CreateButton from '@metis/features/channels/components/channel-list/create-channel/CreateButton';
import FooterSection from '../sections/FooterSection';
import HeaderSection from '../sections/HeaderSection';
import MainSection from '../sections/MainSection';

const LeftColumn = () => (
  <>
    <HeaderSection>
      <SearchChannel />
    </HeaderSection>
    <MainSection>
      <ChannelList />
    </MainSection>
    <FooterSection>
      <CreateButton />
    </FooterSection>
  </>
);

export default LeftColumn;
