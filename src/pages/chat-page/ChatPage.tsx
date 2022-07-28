import ChatContent from '@metis/features/channels/components/chat-content/ChatContent';
import ChatFooter from '@metis/features/channels/components/chat-footer/ChatFooter';
import ChatHeader from '@metis/features/channels/components/chat-header/ChatHeader';
import EmptyStateChannel from '@metis/features/channels/components/empty-state-channel/EmptyStateChannel';
import FooterSection from '@metis/layout/sections/FooterSection';
import HeaderSection from '@metis/layout/sections/HeaderSection';
import MainSection from '@metis/layout/sections/MainSection';
import { useAppSelector } from '@metis/store/hooks';

const ChatPage = () => {
  const { selectedChannel } = useAppSelector((state) => state.channel);
  return (
    <>
      {selectedChannel && (
        <>
          <HeaderSection>
            <ChatHeader />
          </HeaderSection>
          <MainSection>
            <ChatContent />
          </MainSection>
        </>
      )}
      {!selectedChannel && <EmptyStateChannel />}
      <FooterSection>
        <ChatFooter />
      </FooterSection>
    </>
  );
};

export default ChatPage;
