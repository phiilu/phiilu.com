module.exports = function addFontface({ addBase, theme }) {
  const fonts = {
    "@font-face": [
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Bold'), local('OpenSans-Bold'), url('/fonts/OpenSans-Bold.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Italic'), local('SourceSansPro-Italic'), url('/fonts/SourceSansPro-Italic.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'), url('/fonts/SourceSansPro-SemiBold.woff2') format('woff2')",
        fontWeight: "600",
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Medium'), local('OpenSans-Medium'), url('/fonts/OpenSans-Medium.woff2') format('woff2')",
        fontWeight: "500",
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Light'), local('OpenSans-Light'), url('/fonts/OpenSans-Light.woff2') format('woff2')",
        fontWeight: 300,
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans ExtraBold Italic'), local('OpenSans-ExtraBoldItalic'), url('/fonts/OpenSans-ExtraBoldItalic.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans SemiBold Italic'), local('OpenSans-SemiBoldItalic'), url('/fonts/OpenSans-SemiBoldItalic.woff2') format('woff2')",
        fontWeight: 600,
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Light'), local('SourceSansPro-Light'), url('/fonts/SourceSansPro-Light.woff2') format('woff2')",
        fontWeight: 300,
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Light Italic'), local('OpenSans-LightItalic'), url('/fonts/OpenSans-LightItalic.woff2') format('woff2')",
        fontWeight: 300,
        fontStyle: "italic",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Black Italic'), local('SourceSansPro-BlackItalic'), url('/fonts/SourceSansPro-BlackItalic.woff2') format('woff2')",
        fontWeight: 900,
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Light Italic'), local('SourceSansPro-LightItalic'), url('/fonts/SourceSansPro-LightItalic.woff2') format('woff2')",
        fontWeight: 300,
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Italic'), local('OpenSans-Italic'), url('/fonts/OpenSans-Italic.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans ExtraBold'), local('OpenSans-ExtraBold'), url('/fonts/OpenSans-ExtraBold.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro'), local('SourceSansPro-Regular'), url('/fonts/SourceSansPro-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro ExtraLight Italic'), local('SourceSansPro-ExtraLightItalic'), url('/fonts/SourceSansPro-ExtraLightItalic.woff2') format('woff2')",
        fontWeight: 200,
        fontStyle: "italic",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url('/fonts/OpenSans-SemiBold.woff2') format('woff2')",
        fontWeight: 600,
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Black'), local('SourceSansPro-Black'), url('/fonts/SourceSansPro-Black.woff2') format('woff2')",
        fontWeight: 900,
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Bold Italic'), local('OpenSans-BoldItalic'), url('/fonts/OpenSans-BoldItalic.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Medium Italic'), local('OpenSans-MediumItalic'), url('/fonts/OpenSans-MediumItalic.woff2') format('woff2')",
        fontWeight: 500,
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro ExtraLight'), local('SourceSansPro-ExtraLight'), url('/fonts/SourceSansPro-ExtraLight.woff2') format('woff2')",
        fontWeight: 200,
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url('/fonts/SourceSansPro-Bold.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Bold Italic'), local('SourceSansPro-BoldItalic'), url('/fonts/SourceSansPro-BoldItalic.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro SemiBold Italic'), local('SourceSansPro-SemiBoldItalic'), url('/fonts/SourceSansPro-SemiBoldItalic.woff2') format('woff2')",
        fontWeight: 600,
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Regular'), local('OpenSans-Regular'), url('/fonts/OpenSans-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
        fontDisplay: "swap",
      },

      // Open Sans
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Regular'), local('OpenSans-Regular'), url('/fonts/OpenSans-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Light'), local('OpenSans-Light'), url('/fonts/OpenSans-Light.woff2') format('woff2')",
        fontWeight: 300,
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Light Italic'), local('OpenSans-LightItalic'), url('/fonts/OpenSans-LightItalic.woff2') format('woff2')",
        fontWeight: 300,
        fontStyle: "italic",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Medium'), local('OpenSans-Medium'), url('/fonts/OpenSans-Medium.woff2') format('woff2')",
        fontWeight: 500,
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans Bold'), local('OpenSans-Bold'), url('/fonts/OpenSans-Bold.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans SemiBold Italic'), local('OpenSans-SemiBoldItalic'), url('/fonts/OpenSans-SemiBoldItalic.woff2') format('woff2')",
        fontWeight: 600,
        fontStyle: "italic",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Open Sans'",
        src: "local('Open Sans ExtraBold Italic'), local('OpenSans-ExtraBoldItalic'), url('/fonts/OpenSans-ExtraBoldItalic.woff2') format('woff2')",
        fontWeight: "bold",
        fontStyle: "italic",
        fontDisplay: "swap",
      },

      // Source Sans Pro
      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro Italic'), local('SourceSansPro-Italic'), url('/fonts/SourceSansPro-Italic.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "italic",
        fontDisplay: "swap",
      },
      {
        fontFamily: "'Source Sans Pro'",
        src: "local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'), url('/fonts/SourceSansPro-SemiBold.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
        fontDisplay: "swap",
      },
    ],
  };

  addBase(fonts);
};
