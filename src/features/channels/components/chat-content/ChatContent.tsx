/* eslint-disable react/no-array-index-key */
import { useAppSelector } from '@metis/store/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Paper, CircularProgress, Box } from '@mui/material';
import { animated, config, useTransition } from '@react-spring/web';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './ChatContent.styles';
import Message from './message/Message';

export const ChatContent = () => {
  const classes = useStyles();
  const { channelAddress } = useParams();
  const {
    selectedChannel: { messages },
    isLoadingMessages,
  } = useAppSelector((state) => state.channel);
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
    onScroll();
    scrollInstantlyToBottom();
  }, [channelAddress]);

  // Scroll smoothly to last message when there's a new message and the scrollbar
  // is at the bottom
  useEffect(() => {
    if (isBottom) {
      scrollSmoothlyToBottom();
    }
  }, [messages]);

  if (isLoadingMessages) {
    return (
      <Box className={classes.isLoadingMessages}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper onScroll={onScroll} ref={containerRef} className={classes.main} square>
      {messages.map((message, index) => (
        <Message key={index} message={message} color="#A36300" />
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
