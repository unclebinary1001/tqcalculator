const formatDecimals = (num: number, decimals: number) => {
    const factorString = num.toFixed(decimals);
    const [integerPart, decimalPart] = factorString.split(".");
    const formatDecimalPart = decimalPart.padEnd(decimals, "0");
    return `${integerPart}.${formatDecimalPart}`;
  }

  export default formatDecimals