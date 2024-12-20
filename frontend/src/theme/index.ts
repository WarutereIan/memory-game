import { ThemeType } from 'grommet';

export const theme: ThemeType = {
  global: {
    colors: {
      brand: '#1976D2',
      'accent-1': '#2196F3',
      'accent-2': '#64B5F6',
      'accent-3': '#90CAF9',
      'accent-4': '#BBDEFB',
      'neutral-1': '#263238',
      'neutral-2': '#37474F',
      'neutral-3': '#455A64',
      'neutral-4': '#546E7A',
      'status-ok': '#4CAF50',
      'status-warning': '#FFC107',
      'status-error': '#F44336',
      'status-unknown': '#9E9E9E',
      focus: 'accent-1',
    },
    font: {
      family: 'Roboto, sans-serif',
    },
    breakpoints: {
      small: {
        value: 768,
      },
      medium: {
        value: 1024,
      },
      large: {
        value: 1440,
      },
    },
  },
  card: {
    container: {
      background: 'white',
      elevation: 'small',
      round: 'small',
      pad: 'medium',
    },
    header: {
      pad: 'small',
    },
    body: {
      pad: 'small',
    },
    footer: {
      pad: 'small',
    },
  },
  button: {
    border: {
      radius: '4px',
    },
    primary: {
      color: 'white',
      background: 'brand',
    },
    secondary: {
      color: 'brand',
      border: {
        color: 'brand',
        width: '2px',
      },
    },
  },
};