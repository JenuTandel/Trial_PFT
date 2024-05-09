import { CSSVariablesResolver, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 7,
  colors: {
    primary: [
      '#e9f5ff',
      '#d6e4fa',
      '#acc7ee',
      '#80a8e4',
      '#5b8eda',
      '#437dd6',
      '#3575d4',
      '#2560b6',
      '#1c58a9',
      '#064c97',
    ],
  },
  cursorType: 'pointer',
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    '--mantine-color-secondary': '#031837 ',
    '--mantine-color-grey': '#95A1B5',
    '--mantine-color-dark': '#202224',
    '--mantine-container-width': '85%',
    '--mantine-header-height': '65px',
    '--mantine-body-bg': ' #F3F4F8',
    '--loader-color': 'var(--mantine-color-primary)',
  },
  dark: {},
  light: {},
});
