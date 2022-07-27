import { createContext, ReactElement, useMemo, useState } from 'react';

type ReplyType = {
  message: string;
  name: string;
};

export type MessageReplyContextType = {
  reply: ReplyType;
  active: boolean;
  updateReply: (reply: ReplyType) => void;
  discardReply: () => void;
};

type props = {
  children: ReactElement | ReactElement[];
};

export const messageReplyContext = createContext<MessageReplyContextType | null>(null);

export default ({ children }: props) => {
  const [reply, setReply] = useState<ReplyType>({
    message: '',
    name: '',
  });
  const [active, setActive] = useState(false);

  const updateReply = (newReply: ReplyType) => {
    setReply(newReply);
    setActive(true);
  };

  const discardReply = () => {
    setActive(false);
  };

  const value = useMemo(() => ({ reply, updateReply, discardReply, active }), [reply, active]);

  return <messageReplyContext.Provider value={value}>{children}</messageReplyContext.Provider>;
};
