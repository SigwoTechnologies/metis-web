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
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import constants from '@metis/common/configuration/constants';
import useStyles from './Tutorial.styles';
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
            <div>
              <span className={classes.span}>Step 1</span>
              <br />
              <span className={classes.subtitle}>
                When starting Metis Web, you need to install the Metamask extension, so you can
                access your wallet.
              </span>
              <img src={Step1} alt="Step 1" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 2</span>
              <br />
              <span className={classes.subtitle}>
                You can create a new account in MetaMask to access it, or recover an existing one.
              </span>
              <img src={Step2} alt="Step 2" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 3</span>
              <br />
              <span className={classes.subtitle}>
                You will have secure access to your wallets with MetaMask. Here you can see your
                general status.
              </span>
              <img src={Step3} alt="Step 3" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 4</span>
              <br />
              <span className={classes.subtitle}>
                Then associate your MetaMask account with Metis Web to provide your database for
                creating an account.
              </span>
              <img src={Step4} alt="Step 4" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 5</span>
              <br />
              <span className={classes.subtitle}>
                Confirm the link of your MetaMask account with Metis Web.
              </span>
              <img src={Step5} alt="Step 5" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 6</span>
              <br />
              <span className={classes.subtitle}>
                Now by clicking, Metis Web will validate the linked data from MetaMask.
              </span>
              <img src={Step6} alt="Step 6" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 7</span>
              <br />
              <span className={classes.subtitle}>
                Metis Web will request a signature to the network to have a secure connection.
              </span>
              <img src={Step7} alt="Step 7" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 8</span>
              <br />
              <span className={classes.subtitle}>
                And then request an encryption of the unique keys in the network.
              </span>
              <img src={Step8} alt="Step 8" className={classes.image} />
            </div>

            <div>
              <span className={classes.span}>Step 9</span>
              <br />
              <span className={classes.subtitle}>
                And soon start creating your account on Metis Web
              </span>
              <img src={Step9} alt="Step 9" className={classes.image} />
              <br />
              <LoadingButton
                variant="contained"
                onClick={hiddenTutotial}
                className={classes.button}
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
