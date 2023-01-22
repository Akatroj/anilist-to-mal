import { style } from '@vanilla-extract/css';

export const button = style({
  backgroundColor: 'black',
  textAlign: 'center',
  color: 'white',
  padding: 50,
  borderRadius: 15,
  position: 'fixed',
  top: '50%',
  left: '20%',
  zIndex: '1000',
  cursor: 'pointer',
});
