import ChatContent from '@metis/features/channels/components/chat-content/ChatContent';
import ChatFooter from '@metis/features/channels/components/chat-footer/ChatFooter';
import ChatHeader from '@metis/features/channels/components/chat-header/ChatHeader';
import FooterSection from '@metis/layout/sections/FooterSection';
import HeaderSection from '@metis/layout/sections/HeaderSection';
import MainSection from '@metis/layout/sections/MainSection';
import { useAppSelector } from '@metis/store/hooks';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

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
      {/* TODO: change these inline style to the stylesheet */}
      {!selectedChannel && (
        <div style={{ display: 'flex', flex: 1, color: 'white' }}>
          <div style={{ margin: 'auto' }}>
            <QuestionAnswerIcon />
            <p>Select a channel and start chating!</p>
          </div>
        </div>
      )}
      <FooterSection>
        <ChatFooter />
      </FooterSection>
    </>
  );
};

export default ChatPage;
