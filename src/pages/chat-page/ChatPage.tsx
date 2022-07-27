import ChatContent from '@metis/features/channels/components/chat-content/ChatContent';
import ChatFooter from '@metis/features/channels/components/chat-footer/ChatFooter';
import ChatHeader from '@metis/features/channels/components/chat-header/ChatHeader';
import FooterSection from '@metis/layout/sections/FooterSection';
import HeaderSection from '@metis/layout/sections/HeaderSection';
import MainSection from '@metis/layout/sections/MainSection';

const ChatPage = () => (
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

export default ChatPage;
