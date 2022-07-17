import ChatHeader from '@/features/channels/components/chat-header/ChatHeader';
import ChatContent from '@/features/channels/components/chat-content/ChatContent';
import ChatFooter from '@/features/channels/components/chat-footer/ChatFooter';
import HeaderSection from '@/layout/sections/HeaderSection';
import MainSection from '@/layout/sections/MainSection';
import FooterSection from '@/layout/sections/FooterSection';

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
