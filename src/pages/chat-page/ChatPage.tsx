/* eslint-disable no-unused-expressions */
import ChatContent from '@metis/features/channels/components/chat-content/ChatContent';
import ChatFooter from '@metis/features/channels/components/chat-footer/ChatFooter';
import ChatHeader from '@metis/features/channels/components/chat-header/ChatHeader';
import FooterSection from '@metis/layout/sections/FooterSection';
import HeaderSection from '@metis/layout/sections/HeaderSection';
import MainSection from '@metis/layout/sections/MainSection';
import { useAppSelector } from '@metis/store/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { channels } = useAppSelector((state) => state.channel);
  const navigate = useNavigate();

  // Set the selected channel when the user navigates to the page
  useEffect(() => {
    // Navigate to the main page on start when there's no channels
    channels.length === 0 && navigate('/main');
  }, []);

  return (
    <>
      <HeaderSection>
        <ChatHeader />
      </HeaderSection>
      <ChatContent />
      <FooterSection>
        <ChatFooter />
      </FooterSection>
    </>
  );
};

export default ChatPage;
