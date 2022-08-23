import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Paper } from '@mui/material';
import { animated, config, useTransition } from '@react-spring/web';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useSelectedChannel from '../../hooks/useSelectedChannel';
import useStyles from './ChatContent.styles';
import Message from './message/Message';

// TODO: put this inside the message component
const formatDate = (dateNow: number) => {
  const date = new Date(dateNow);

  return date.toLocaleDateString('en-US');
};

const ChatContent = () => {
  const classes = useStyles();
  const { messages, channelAddress: selectedChannelAddress } = useSelectedChannel();
  const sortedMessages = useMemo(() => [...messages].reverse(), [messages]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);
  const transition = useTransition(isBottom, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  const scrollSmoothlyToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollInstantlyToBottom = () => {
    scrollRef.current?.scrollIntoView();
  };

  const onScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setIsBottom(scrollTop + clientHeight === scrollHeight);
    }
  };

  useLayoutEffect(() => {
    scrollInstantlyToBottom();
  }, [selectedChannelAddress]);

  // Scroll smoothly to last message when there's a new message and the scrollbar
  // is at the bottom
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isBottom && scrollSmoothlyToBottom();
  }, [messages]);

  return (
    <Paper onScroll={onScroll} ref={containerRef} className={classes.main} square>
      {sortedMessages.map(({ senderAlias, message, createdAt }, index) => (
        <Message
          // TODO: the backend is not giving us any way to differentiate between messages... Too bad!
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          name={senderAlias}
          message={message}
          date={formatDate(createdAt)}
          color="#A36300"
        />
      ))}
      {transition(
        (styles, item) =>
          !item && (
            <animated.div style={styles} className={classes.scrollToBottomButton}>
              <Button
                onClick={scrollInstantlyToBottom}
                color="primary"
                variant="contained"
                component="label"
              >
                <KeyboardArrowDownIcon />
              </Button>
            </animated.div>
          )
      )}
      <div ref={scrollRef} />
    </Paper>
  );
};

export default ChatContent;
