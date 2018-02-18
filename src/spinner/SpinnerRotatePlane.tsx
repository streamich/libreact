import styled from 'freestyler/lib/react/styled';

const keyframes = {
  '0%': {
    transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)'
  },
  '50%': {
    transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)'
  },
  '100%': {
    transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)'
  }
};

const SpinnerRotatePlane = styled('div')({
  w: '40px',
  h: '40px',
  bg: '#333',
  mar: '40px auto',
  animation: 'sk-rotatePlane 1.2s infinite ease-in-out',
  '@keyframes sk-rotatePlane': keyframes,
});

export default SpinnerRotatePlane;
