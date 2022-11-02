/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, CircularProgress, Paper } from '@mui/material';
import { animated, config, useTransition } from '@react-spring/web';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMessages } from '../../hooks/useGetMessages';
import useStyles from './ChatContent.styles';
import Message from './message/Message';

export const ChatContent = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const initialPage = 2;
  const [page, setPage] = useState(initialPage);
  const [visible, setVisible] = useState(false);
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
    setPage(initialPage);
  }, [channelAddress]);

  // Scroll smoothly to last message when there's a new message and the scrollbar
  // is at the bottom
  useEffect(() => {
    if (isBottom) {
      scrollSmoothlyToBottom();
    }

    if (containerRef?.current && containerRef?.current.firstChild) {
      const onChange = (entries: any, observer: any) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };

      const observer = new IntersectionObserver(onChange, {
        rootMargin: '0px',
      });

      observer.observe(containerRef.current.firstChild as any);
    }
  }, [messages]);

  const getMoreMessages = () => {
    setPage(page + 1);
    dispatch(
      useGetMessages({ channelAddress: String(channelAddress), pageNumber: page, pageSize: 5 })
    );
  };

  return (
    <>
      {visible && !isLoadingMessages && (
        <Button onClick={getMoreMessages} color="primary" variant="contained" component="label">
          <KeyboardArrowUpIcon />
        </Button>
      )}
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
    </>
  );
};
