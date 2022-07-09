import { useState, useEffect } from 'react';
import ChatHeader from '../../features/channels/components/chat-header/ChatHeader';
import ChatContent from '../../features/channels/components/chat-content/ChatContent';
import ChatFooter from '../../features/channels/components/chat-footer/ChatFooter';
import HeaderSection from '../../layout/sections/HeaderSection';
import MainSection from '../../layout/sections/MainSection';
import FooterSection from '../../layout/sections/FooterSection';
import Spinner from '../../common/components/ui/Spinner';

const ChatContainer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeaderSection>
        <ChatHeader />
      </HeaderSection>
      <MainSection>{loading ? <Spinner /> : <ChatContent />}</MainSection>
      <FooterSection>
        <ChatFooter />
      </FooterSection>
    </>
  );
};

export default ChatContainer;
