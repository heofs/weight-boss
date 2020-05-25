export const colors = {
  turquoise: '#5cb3b1',
  darkTurquoise: '#499d9b',
  red: '#dc3545',
  beige: `#e5daca`,
  darkBeige: `#d6c6ae`,
  grey: '#7395AE',
  dark: '#20232a',
  violet: '#8884d8',
  blue: 'dodgerblue',
  border: '#ced4da',
  offWhite: '#efe8e1',
};

colors.primary = colors.turquoise;
colors.darkPrimary = colors.darkTurquoise;
colors.secondary = colors.grey;
colors.background = colors.dark;
colors.danger = colors.red;
colors.text = colors.offWhite;
colors.focus = colors.blue;
colors.border = colors.turquoise;

export const sizes = {
  textSize: '1.2rem',
  smallerText: '0.8rem',
  borderSize: '2px',
  cornerRadius: '5px',
  varticalMargin: '1rem',
};

export const device = {
  mobile: `screen and (min-width: 425px)`,
  tablet: `screen and (min-width: 768px)`,
  desktop: `screen and (min-width: 1100px)`,
  desktopLg: `screen and (min-width: 1500px)`,
};

export const animations = {
  speed: '0.1s',
};
