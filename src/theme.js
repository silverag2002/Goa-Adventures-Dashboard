// color design tokens export
export const colorPalette = {
  grey: {
    0: "#FAFAFA", // manually adjusted
    100: "#F5F5F5", // manually adjusted
    200: "#EEEEEE", // manually adjusted
    300: "#E0E0E0",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    900: "#212121",
    1000: "#FFFFFF",
  },
  primary: {
    // blue E3F2FD
    10: "#eef2f6",
    50: "#E3F2FD",
    200: "#90CAF9",
    500: "#2196F3",
    600: "#1E88E5",
    800: "#1565C0",
  },
  secondary: {
    // yellow
    50: "#EDE7F6", // manually adjusted
    200: "#B39DDB",
    500: "#673AB7",
    600: "#5E35B1",
    800: "#4527A0",
  },
  warning: {
    50: "#B9F6CA",
    100: "#FFE57F",
    500: "#FFC107",
  },
};

// // function that reverses the color palette
// function reverseTokens(tokensDark) {
//   const reversedTokens = {};
//   Object.entries(tokensDark).forEach(([key, val]) => {
//     const keys = Object.keys(val);
//     const values = Object.values(val);
//     const length = keys.length;
//     const reversedObj = {};
//     for (let i = 0; i < length; i++) {
//       reversedObj[keys[i]] = values[length - i - 1];
//     }
//     reversedTokens[key] = reversedObj;
//   });
//   return reversedTokens;
// }
// export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...colorPalette.primary,
              main: colorPalette.primary[400],
              light: colorPalette.primary[400],
            },
            secondary: {
              ...colorPalette.secondary,
              main: colorPalette.secondary[300],
            },
            warning: {
              main: colorPalette.warning[100],
              light: colorPalette.warning[50],
              dark: colorPalette.warning[500],
            },
            neutral: {
              ...colorPalette.grey,
              main: colorPalette.grey[500],
            },
            background: {
              default: colorPalette.primary[600],
              alt: colorPalette.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...colorPalette.primary,
              main: colorPalette.primary[500],
              light: colorPalette.primary[10],
              blue200: colorPalette.primary[200],
              blue500: colorPalette.primary[500],
              blue600: colorPalette.primary[600],
              blue800: colorPalette.primary[800],
            },
            secondary: {
              ...colorPalette.secondary,
              main: colorPalette.secondary[50],
              purple200: colorPalette.secondary[200],
              purple500: colorPalette.secondary[500],
              purple600: colorPalette.secondary[600],
              purple800: colorPalette.secondary[800],
            },
            neutral: {
              ...colorPalette.grey,
              main: colorPalette.grey[50],
              grey100: colorPalette.grey[100],
              grey200: colorPalette.grey[200],
              grey300: colorPalette.grey[300],
              grey500: colorPalette.grey[500],
              grey600: colorPalette.grey[600],
              grey700: colorPalette.grey[700],
              grey900: colorPalette.grey[900],
              white: colorPalette.grey[1000],
            },
            background: {
              default: colorPalette.grey[1000],
              alt: colorPalette.grey[700],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
