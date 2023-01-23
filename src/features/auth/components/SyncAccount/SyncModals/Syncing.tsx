import Box from '@mui/material/Box';

type props = {
  codeSecurityRequest: number;
};

export const Syncing = ({ codeSecurityRequest }: props) => {
  return (
    <Box>
      <br />
      <br />
      <span>
        <strong>Code: </strong>
        {codeSecurityRequest}
      </span>
      <br />
      <span>You are syncing. Waiting to be approved on the other device.</span>
      <br />
      <sub> (This request expires in 1 minute)</sub>
    </Box>
  );
};
