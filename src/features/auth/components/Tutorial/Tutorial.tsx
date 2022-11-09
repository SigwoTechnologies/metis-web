import Modal from '@metis/common/components/ui/Modal';
import Step1 from '@metis/assets/images/tutorial/step1.png';
import Step2 from '@metis/assets/images/tutorial/step2.png';
import Step3 from '@metis/assets/images/tutorial/step3.png';
import Step4 from '@metis/assets/images/tutorial/step4.png';
import Step5 from '@metis/assets/images/tutorial/step5.png';
import Step6 from '@metis/assets/images/tutorial/step6.png';
import Step7 from '@metis/assets/images/tutorial/step7.png';
import Step8 from '@metis/assets/images/tutorial/step8.png';
import Step9 from '@metis/assets/images/tutorial/step9.png';
import Slider from 'react-slick';
import { LoadingButton } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import constants from '@metis/common/configuration/constants';
import useStyles from './Tutorial.styles';
import { settings } from './SettingsSliderTutorial';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Tutorial = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const display = localStorage.getItem(constants.LOGIN_TUTORIAL);
    if (!display || display === 'false') setModalOpen(true);
  }, []);

  const hiddenTutotial = () => {
    localStorage.setItem(constants.LOGIN_TUTORIAL, 'true');
    setModalOpen(false);
  };

  const contentSlider = [
    {
      title: 'Step 1',
      text: 'When starting Metis Web, you need to install the Metamask extension, so you can access your wallet',
      image: Step1,
    },
    {
      title: 'Step 2',
      text: 'You can create a new account in MetaMask to access it, or recover an existing one.',
      image: Step2,
    },
    {
      title: 'Step 3',
      text: 'You will have secure access to your wallets with MetaMask. Here you can see your general status.',
      image: Step3,
    },
    {
      title: 'Step 4',
      text: 'Then associate your MetaMask account with Metis Web to provide your database for creating an account.',
      image: Step4,
    },
    {
      title: 'Step 5',
      text: 'Confirm the link of your MetaMask account with Metis Web.',
      image: Step5,
    },
    {
      title: 'Step 6',
      text: 'Now by clicking, Metis Web will validate the linked data from MetaMask.',
      image: Step6,
    },
    {
      title: 'Step 7',
      text: 'Metis Web will request a signature to the network to have a secure connection.',
      image: Step7,
    },
    {
      title: 'Step 8',
      text: 'And then request an encryption of the unique keys in the network.',
      image: Step8,
    },
    {
      title: 'Step 9',
      text: 'And soon start creating your account on Metis Web',
      image: Step9,
    },
  ];

  return (
    <>
      <LoadingButton
        variant="contained"
        onClick={() => setModalOpen(true)}
        className={classes.button}
      >
        <span className={classes.span}>Tutorial</span>
      </LoadingButton>

      <Modal open={modalOpen}>
        <Box className={classes.container}>
          <IconButton
            aria-label="close"
            onClick={() => setModalOpen(false)}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>

          <Slider {...settings}>
            {contentSlider.map((content) => {
              return (
                <div>
                  <span className={classes.span}>{content.title}</span>
                  <br />
                  <p className={classes.subtitle}>{content.text}</p>
                  <img src={content.image} alt={content.title} className={classes.image} />
                </div>
              );
            })}

            <div>
              <LoadingButton
                variant="contained"
                onClick={hiddenTutotial}
                className={classes.getStarted}
              >
                <span className={classes.span}>Get Started</span>
              </LoadingButton>
            </div>
          </Slider>
        </Box>
      </Modal>
    </>
  );
};
