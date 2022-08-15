import ChatContent from '@metis/features/channels/components/chat-content/ChatContent';
import ChatFooter from '@metis/features/channels/components/chat-footer/ChatFooter';
import ChatHeader from '@metis/features/channels/components/chat-header/ChatHeader';
import { selectChannel } from '@metis/features/channels/store/channel.slice';
import FooterSection from '@metis/layout/sections/FooterSection';
import HeaderSection from '@metis/layout/sections/HeaderSection';
import MainSection from '@metis/layout/sections/MainSection';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChatPage = () => {
  const { channelAddress } = useParams();
  const { channels } = useAppSelector((state) => state.channel);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Set the selected channel when the user navigates to the page
  useEffect(() => {
    // Navigate to the main page on start when there's no channels
    if (channels.length === 0) {
      navigate('/main');
      return;
    }

    dispatch(selectChannel(channelAddress));
  }, [channelAddress]);

  return (
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
};

export default ChatPage;
