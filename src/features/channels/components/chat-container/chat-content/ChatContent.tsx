import Box from '@mui/material/Box';

import PompAvatar from 'src/assets/images/avatars/pomp.jpg';
import ReneAvatar from 'src/assets/images/avatars/rene.jpg';
import Message from './message/Message';

const ChatContent = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Message
      name="Pompilio Fiore"
      message="Good morning"
      date="27/06/2022"
      color="#A36300"
      avatar={PompAvatar}
    />
    <Message
      name="Rene Reyes"
      message="Good morning"
      date="10:31 PM"
      color="#44C553"
      avatar={ReneAvatar}
    />
    <Message
      name="Pompilio Fiore"
      message="How is it going?"
      date="10:32 PM"
      color="#A36300"
      avatar={PompAvatar}
    />
    <Message
      name="Rene Reyes"
      message="Not too bad, working on a smart contract, very interesting stuff.. what about you?"
      date="10:33 PM"
      color="#44C553"
      avatar={ReneAvatar}
    />
  </Box>
);

export default ChatContent;
