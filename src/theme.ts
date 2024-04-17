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
    '#FFCB2E', //yellow, 9
    '#7E57C2', //purple, 10
    '#C1B5D0', //light purple, 11
    '#424242', //gray button, 12
    '#8E24AA', //purple button fill, 13
];

export const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  colors: {
    brand: colors,
  }
});
