import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  MainContainer: {
    width: '100%',
    paddingRight: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    fontSize: '20px',
    '@media (max-width: 940px)': {
      paddingRight: '0px',
    },
  },

  container: {
    backgroundColor: "#1f1e25", // Conserve le fond actuel
    height: "100vh",
    width: "76%",
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4, // Plus haut pour être au-dessus
    borderRadius: '15px', // Coins arrondis
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)', // Ombre légère pour un effet 3D
    backdropFilter: 'blur(5px)', // Flou léger pour effet visuel
    '@media (max-width: 940px)': {
      width: '100%', // Prendre toute la largeur sur petits écrans
      height: 'calc(100vh - 70px)', // Prendre toute la largeur sur petits écrans
      borderRadius: '0px', // Coins arrondis
      boxShadow: '0 0 0 0', // Ombre légère pour un effet 3D


    }
  },

  text: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)', // Ombre du texte pour un meilleur contraste
    fontFamily: 'Arial, sans-serif',
    animation: 'pulse 1.5s infinite', // Animation de pulsation du texte
    '@media (max-width: 940px)': {
      fontSize: '14px',


    }
  },

  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },

  circularProgress: {
    color: '#FF4081', // Couleur vibrante pour le `CircularProgress`
    size: 70, // Taille personnalisée
    thickness: 6, // Épaisseur du cercle
  },
}));

const LoadingGameBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.MainContainer}>
        <CircularProgress className={classes.circularProgress} />
        <Typography className={classes.text}>Loading...</Typography>
      </div>
    </div>
  );
};

export default LoadingGameBox;
