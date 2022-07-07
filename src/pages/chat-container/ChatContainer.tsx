import ChatHeader from 'src/features/channels/components/chat-header/ChatHeader';
import ChatContent from 'src/features/channels/components/chat-content/ChatContent';
import ChatFooter from 'src/features/channels/components/chat-footer/ChatFooter';
import HeaderSection from 'src/layout/sections/HeaderSection';
import MainSection from 'src/layout/sections/MainSection';
import FooterSection from 'src/layout/sections/FooterSection';

const ChatContainer = () => (
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

export default ChatContainer;
