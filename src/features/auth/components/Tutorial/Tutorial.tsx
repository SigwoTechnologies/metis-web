import Modal from '@metis/common/components/ui/Modal';
import Slider from 'react-slick';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import constants from '@metis/common/configuration/constants';
import useStyles from './Tutorial.styles';
import { settings, contentSlider } from './SettingsSliderTutorial';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Tutorial = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = (state: boolean) => {
    setModalOpen(state);
  };

  useEffect(() => {
    const display = localStorage.getItem(constants.LOGIN_TUTORIAL);
    if (!display || display === 'false') handleModal(true);
  }, []);

  const hiddenTutotial = () => {
    localStorage.setItem(constants.LOGIN_TUTORIAL, 'true');
    handleModal(false);
  };

  return (
    <>
      <LoadingButton
        variant="contained"
        onClick={() => handleModal(true)}
        className={classes.button}
      >
        <span className={classes.span}>Tutorial</span>
      </LoadingButton>

      <Modal open={modalOpen}>
        <Box className={classes.container}>
          <IconButton aria-label="close" onClick={hiddenTutotial} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>

          <Slider {...settings}>
            {contentSlider.map((content) => {
              return (
                <div key={content.title}>
                  <span className={classes.span}>{content.title}</span>
                  <br />
                  <p className={classes.subtitle}>{content.text}</p>
                  <img src={content.image} alt={content.title} className={classes.image} />
                </div>
              );
            })}
          </Slider>
        </Box>
      </Modal>
    </>
  );
};
