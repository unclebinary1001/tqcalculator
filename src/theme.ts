import { createTheme, MantineColorsTuple } from "@mantine/core";

const colors: MantineColorsTuple = [
    '#4F23C0', //bg, 0
    '#4527A0', //primary, 1
    '#673AB7', //button, 2
    '#6A1B9A', //outline, 3
    '#512DA8', //border, 4
    '#D5165A', //red, 5
    '#424242', //gray, 6
    '#D9D6D6', //light gray, 7
    '#ffffff', //white, 8
    '#3b218f'
];

export const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  colors: {
    light: colors,
  }
});
