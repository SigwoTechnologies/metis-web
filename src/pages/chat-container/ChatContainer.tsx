import ChatHeader from 'src/features/channels/components/chat-header/ChatHeader';
import ChatContent from 'src/features/channels/components/chat-content/ChatContent';
import ChatFooter from 'src/features/channels/components/chat-footer/ChatFooter';
import HeaderSection from 'src/layout/sections/HeaderSection';
import MainSection from 'src/layout/sections/MainSection';
import FooterSection from 'src/layout/sections/FooterSection';
import Spinner from 'src/common/components/ui/Spinner';
import { useState, useEffect } from 'react';

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
