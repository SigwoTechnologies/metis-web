import ChatHeader from 'src/features/channels/components/chat-header/ChatHeader';
import ChatContent from 'src/features/channels/components/chat-content/ChatContent';
import ChatFooter from 'src/features/channels/components/chat-footer/ChatFooter';
import FooterSection from '../sections/FooterSection';
import HeaderSection from '../sections/HeaderSection';
import MainSection from '../sections/MainSection';

const LeftColumn = () => (
  <>
    <HeaderSection>
      <ChatHeader />
    </HeaderSection>
    <MainSection>
      <ChatContent />
    </MainSection>
    <FooterSection>
      <ChatFooter />
    </FooterSection>
  </>
);

export default LeftColumn;
