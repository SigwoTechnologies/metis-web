import React from 'react';

const MetamaskNotice = () => (
  <div>
    You need metamask to use Metis.
    <a
      href="https://metamask.io/"
      style={{
        display: 'flex',
        border: '1px solid',
        color: '#fff',
        padding: '5px',
        margin: '0.5rem 1rem 0 1rem',
        justifyContent: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
      }}
      target="_blank"
      rel="noreferrer"
    >
      Install Metamask
    </a>
  </div>
);

export default MetamaskNotice;
