/* ***************************************************
To add a theme:
  1. create the theme object below (copy/paste an exiting one and tweak it)
  2. export it in the themes object at the bottom of this file
  3. add it to the Themer.js component
  4. for legacy support of the old theming, add it to the main-styles.js
*************************************************** */

const highlights = {
  lightThemeHighlightYellow: {
    hex: '#ffff00',
    rgba: alpha => buildRgba(255, 255, 0, alpha),
    contrastText: "#222"
  },
  lightThemeHighlightGreen: {
    hex: '#00b300',
    rgba: alpha => buildRgba(0, 179, 0, alpha),
    contrastText: "#222"
  },
  darkThemeHighlightGreen: {
    hex: '#00ff00',
    rgba: alpha => buildRgba(0, 255, 0, alpha),
    contrastText: "#FFF"
  }
}

// export const oranges = {
//   name: 'oranges',
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#ffa726',
//       light: '#ffd95b',
//       dark: '#E99924',
//       contrastText: '#fff'
//     },
//     secondary: {
//       main: '#ffca28',
//       light: '#fffd61',
//       dark: '#c79a00',
//       contrastText: '#222'
//     }
//   }
// }

export const light = {
  name: 'light',
  palette: {
    type: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f5d165',
      light: '#ffff95',
      dark: '#c0a035',
      contrastText: '#222'
    }
  },
  shape :{
    borderRadius: '1'
  },
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color5: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color5_text() {
    return this.darkText
  },
  color4: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color4_text() {
    return this.darkText
  },
  color3: {
    hex: '#EEEEEE',
    rgba: alpha => buildRgba(234, 234, 234, alpha)
  },
  get color3_text() {
    return this.darkText
  },
  color2: {
    hex: '#FEFEFE',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color2_text() {
    return this.darkText
  },
  color1: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color1_text() {
    return this.darkText
  }
}

export const woSheet = {
  name: 'woSheet',
  palette: {
    type: 'light',
    background: { paper: '#aaa', default: '#9d9d9d' },
    primary: {
      light: '#FFFFFF',
      main: '#cecece',
      dark: '#9d9d9d',
      contrastText: '#222'
    },
    secondary: {
      // light: '#ffffb4',
      light: '#ffffff',
      main: '#FFD883',
      dark: '#caa754',
      contrastText: '#353535'
    }
  },
  shape :{
    borderRadius: '1'
  },
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#FEFFFF',
    // hex: '#06FBFB',
    rgba: alpha => buildRgba(254, 255, 255, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#F3F2F2',
    rgba: alpha => buildRgba(243, 242, 242, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#FFD883',
    rgba: alpha => buildRgba(255, 216, 131, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#999899',
    rgba: alpha => buildRgba(153, 152, 153, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#444443',
    rgba: alpha => buildRgba(68, 68, 67, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

// export const medium = {
//   name: 'medium',
//   palette: {
//     type: 'light',
//     background: { paper: '#aaa', default: '#9d9d9d' },
//     primary: {
//       light: '#dbdbdb',
//       main: '#8F8F8F',
//       dark: '#4f4f4f',
//       contrastText: '#fff'
//     },
//     secondary: {
//       // light: '#ffffb4',
//       light: '#b7c4d1',
//       main: '#808991',
//       dark: '#484ds2',
//       contrastText: '#fff'
//     }
//   },
//   shape :{
//     borderRadius: '1'
//   },
//   highlightYellow: highlights.lightThemeHighlightYellow,
//   highlightGreen: highlights.lightThemeHighlightGreen,
// }

export const dark = {
  name: 'dark',
  palette: {
    type: 'dark',
    primary: {
      light: '8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#fff'
    },
    secondary: {
      light: '#efefef',
      main: '#bdbdbd',
      dark: '#8d8d8d',
      contrastText: '#222'
    }
  },
  shape :{
    borderRadius: '1'
  },
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color5: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color5_text() {
    return this.darkText
  },
  color4: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color4_text() {
    return this.darkText
  },
  color3: {
    hex: '#616161',
    // hex: '#EEEEEE',
    rgba: alpha => buildRgba(234, 234, 234, alpha)
  },
  get color3_text() {
    // return this.darkText
    return '#FFFFFF'
  },
  color2: {
    hex: '#FEFEFE',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color2_text() {
    return this.darkText
  },
  color1: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color1_text() {
    return this.darkText
  }
}

export const sea = {
  name: 'sea',
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#274469',
    rgba: alpha => buildRgba(39, 68, 105, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#477DBF',
    rgba: alpha => buildRgba(71, 125, 191, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#65B4E6',
    rgba: alpha => buildRgba(101, 180, 230, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#EEEEEE',
    rgba: alpha => buildRgba(238, 238, 238, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const snow = {
  name: 'snow',
  palette: { type: 'light' },
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color5: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color5_text() {
    return this.darkText
  },
  color4: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color4_text() {
    return this.darkText
  },
  color3: {
    hex: '#EEEEEE',
    rgba: alpha => buildRgba(234, 234, 234, alpha)
  },
  get color3_text() {
    return this.darkText
  },
  color2: {
    hex: '#FEFEFE',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color2_text() {
    return this.darkText
  },
  color1: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color1_text() {
    return this.darkText
  }
}

export const seaOrig = {
  name: 'seaOrig',
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  color1: {
    hex: '#555757',
    rgba: alpha => buildRgba(85, 87, 87, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#87C4C4',
    rgba: alpha => buildRgba(135, 196, 196, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#BCF5F5',
    rgba: alpha => buildRgba(188, 245, 245, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#F5FAFA',
    rgba: alpha => buildRgba(245, 250, 250, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const villa = {
  name: 'villa',
  palette: { type: 'light' },
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#EBE8E4',
    rgba: alpha => buildRgba(235, 232, 228, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#F5F099',
    rgba: alpha => buildRgba(245, 240, 153, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#FA9C1E',
    rgba: alpha => buildRgba(250, 156, 30, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#48A180',
    rgba: alpha => buildRgba(72, 161, 128, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const crystal = {
  name: 'crystal',
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#F2F2F2',
    rgba: alpha => buildRgba(242, 242, 242, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#D9D9D9',
    rgba: alpha => buildRgba(217, 217, 217, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#95ACBF',
    rgba: alpha => buildRgba(149, 172, 191, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#4C5D73',
    rgba: alpha => buildRgba(76, 93, 115, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#404040',
    rgba: alpha => buildRgba(64, 64, 64, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const primaries = {
  name: 'primaries',
  palette: { type: 'light' },
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  color1: {
    hex: '#F2F2F2',
    rgba: alpha => buildRgba(242, 242, 242, alpha)
  },
  get color1_text() {
    return this.darkText
  },
  color2: {
    hex: '#F2B705',
    rgba: alpha => buildRgba(242, 183, 5, alpha)
  },
  get color2_text() {
    return this.darkText
  },
  color3: {
    hex: '#04D9C4',
    rgba: alpha => buildRgba(4, 217, 196, alpha)
  },
  get color3_text() {
    return this.darkText
  },
  color4: {
    hex: '#0788D9',
    rgba: alpha => buildRgba(7, 136, 217, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#BF0A3A',
    rgba: alpha => buildRgba(191, 10, 58, alpha)
  },
  get color5_text() {
    return this.color1
  },
  darkText: {
    hex: '#333',
    rgba: alpha => buildRgba(51, 51, 51, alpha)
  }
}

export const siberianWinter = {
  name: 'siberianWinter',
  palette: { type: 'dark' },
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#FFFBFF',
    rgba: alpha => buildRgba(255, 251, 255, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#E8ECED',
    rgba: alpha => buildRgba(232, 235, 237, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#A4B7BB',
    rgba: alpha => buildRgba(163, 182, 186, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#76A0B0',
    rgba: alpha => buildRgba(117, 160, 175, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#35262D',
    rgba: alpha => buildRgba(52, 38, 45, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const stormTrooperInverse = {
  name: 'stormTrooperInverse',
  palette: { type: 'dark' },
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color5: {
    hex: '#EBF0F2',
    rgba: alpha => buildRgba(235, 240, 242, alpha)
  },
  get color5_text() {
    return this.color1
  },
  color4: {
    hex: '#D2D7D9',
    rgba: alpha => buildRgba(210, 215, 217, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color3: {
    hex: '#9FA4A6',
    rgba: alpha => buildRgba(159, 164, 166, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color2: {
    hex: '#555555',
    rgba: alpha => buildRgba(85, 85, 85, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color1: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color5_highlight: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  }
}

export const stormTrooper = {
  name: 'stormTrooper',
  palette: { type: 'light' },
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#EBF0F2',
    rgba: alpha => buildRgba(235, 240, 242, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#D2D7D9',
    rgba: alpha => buildRgba(210, 215, 217, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#9FA4A6',
    rgba: alpha => buildRgba(159, 164, 166, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  },
  get color5_text() {
    return this.color1
  },
  color5_highlight: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  }
}

export const vader = {
  name: 'vader',
  palette: { type: 'dark' },
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#dadee0',
    rgba: alpha => buildRgba(235, 240, 242, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#D2D7D9',
    rgba: alpha => buildRgba(210, 215, 217, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#9FA4A6',
    rgba: alpha => buildRgba(159, 164, 166, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  },
  get color5_text() {
    return this.color1
  },
  color5_highlight: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  }
}

export const bakery = {
  name: 'bakery',
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#F2F2F2',
    rgba: alpha => buildRgba(242, 242, 242, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#F2E9D8',
    rgba: alpha => buildRgba(242, 233, 216, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#7798D9',
    rgba: alpha => buildRgba(119, 152, 217, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#465D8C',
    rgba: alpha => buildRgba(70, 93, 140, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#484F73',
    rgba: alpha => buildRgba(72, 79, 115, alpha)
  },
  get color5_text() {
    return this.color1
  },
  lightText: {
    hex: '#EEE',
    rgba: alpha => buildRgba(238, 238, 238, alpha)
  }
}

export const lake = {
  name: 'lake',
  type: 'custom',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  // primary: this.color3,
  // primary_text: this.color3_text,
  // secondary: this.color4,
  // secondary_text: this.color4_text,
  // tertiary: this.color5,
  // tertiary_text: this.color5_text,
  // accent: this.color2,
  // accent_text: this.color2_text,
  color1: {
    hex: '#FFFFFF',
    rgba: alpha => buildRgba(255, 255, 255, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#F2FEFE',
    rgba: alpha => buildRgba(242, 254, 254, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#ACF0F2',
    rgba: alpha => buildRgba(172, 240, 242, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#1695A3',
    rgba: alpha => buildRgba(22, 149, 163, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#225378',
    rgba: alpha => buildRgba(34, 83, 120, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const book = {
  name: 'book',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#F0F2F2',
    rgba: alpha => buildRgba(239, 242, 242, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#96C6D9',
    rgba: alpha => buildRgba(149, 197, 216, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#54A1BF',
    rgba: alpha => buildRgba(84, 160, 191, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#59A8D9',
    rgba: alpha => buildRgba(88, 167, 216, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#4184BF',
    rgba: alpha => buildRgba(65, 132, 191, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const dina = {
  name: 'dina',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#F2E6DF',
    rgba: alpha => buildRgba(242, 230, 223, alpha)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#F2E0C9',
    rgba: alpha => buildRgba(242, 224, 201, alpha)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#D9C0A3',
    rgba: alpha => buildRgba(217, 192, 163, alpha)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#BFAC95',
    rgba: alpha => buildRgba(191, 172, 149, alpha)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#8C7C6D',
    rgba: alpha => buildRgba(140, 124, 109, alpha)
  },
  get color5_text() {
    return this.color1
  }
}

export const fordRaptor = {
  name: 'fordRaptor',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#F2F2F2',
    rgba: alpha => buildRgba(242, 242, 242, 1)
  },
  get color1_text() {
    return this.color5
  },
  color2: {
    hex: '#F2BA52',
    rgba: alpha => buildRgba(242, 186, 82, 1)
  },
  get color2_text() {
    return this.color5
  },
  color3: {
    hex: '#F2913D',
    rgba: alpha => buildRgba(242, 145, 61, 1)
  },
  get color3_text() {
    return this.color5
  },
  color4: {
    hex: '#818B8C',
    rgba: alpha => buildRgba(129, 139, 140, 1)
  },
  get color4_text() {
    return this.color1
  },
  color5: {
    hex: '#383840',
    rgba: alpha => buildRgba(56, 56, 64, 1)
  },
  get color5_text() {
    return this.color1
  }
}

export const themeOne = {
  name: 'themeOne',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color1: {
    hex: '#2D3540',
    rgba: alpha => buildRgba(45, 53, 64, alpha)
  },
  color2: {
    hex: '#1B2026',
    rgba: alpha => buildRgba(27, 32, 38, alpha)
  },
  color3: {
    hex: '#80858C',
    rgba: alpha => buildRgba(128, 133, 140, alpha)
  },
  color4: {
    hex: '#B0B7BF',
    rgba: alpha => buildRgba(176, 183, 191, alpha)
  },
  color5: {
    hex: '#03A696',
    rgba: alpha => buildRgba(3, 166, 150, alpha)
  },
  color5_highlight: {
    hex: '#05E6CF',
    rgba: alpha => buildRgba(230, 207, 90, alpha)
  }
}

export const themeTwo = {
  name: 'themeTwo',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color4: {
    hex: '#2D3540',
    rgba: alpha => buildRgba(45, 53, 6, alpha)
  },
  color5: {
    hex: '#68788C',
    rgba: alpha => buildRgba(104, 120, 140, alpha)
  },
  color3: {
    hex: '#03A696',
    rgba: alpha => buildRgba(3, 166, 150, alpha)
  },
  color1: {
    hex: '#C0D904',
    rgba: alpha => buildRgba(192, 217, 4, alpha)
  },
  color2: {
    hex: '#93A603',
    rgba: alpha => buildRgba(147, 166, 3, alpha)
  },
  color5_highlight: {
    hex: '#93A603',
    rgba: alpha => buildRgba(147, 166, 3, alpha)
  }
}

export const themeThree = {
  name: 'themeThree',
  highlightYellow: highlights.lightThemeHighlightYellow,
  highlightGreen: highlights.lightThemeHighlightGreen,
  darkText: {
    hex: '#333333',
    rgba: alpha => buildRgba(0, 0, 0, alpha)
  },
  color4: {
    hex: '#F2F2F2',
    rgba: alpha => buildRgba(242, 242, 242, alpha)
  },
  color5: {
    hex: '#BFBFBF',
    rgba: alpha => buildRgba(191, 191, 191, alpha)
  },
  color3: {
    hex: '#8C8C8C',
    rgba: alpha => buildRgba(140, 140, 140, alpha)
  },
  color1: {
    hex: '#595959',
    rgba: alpha => buildRgba(89, 89, 89, alpha)
  },
  color2: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  },
  color5_highlight: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  }
}

const buildRgba = (red, green, blue, alpha) => {
  return `rgba(${red},${green},${blue},${alpha})`
}

export const themes = {
  bakery: bakery,
  book: book,
  crystal: crystal,
  dark: dark,
  dina: dina,
  lake: lake,
  light: light,
  // medium: medium,
  // oranges: oranges,
  sea: sea,
  siberianWinter: siberianWinter,
  snow: snow,
  stormTrooper: stormTrooper,
  stormTrooperInverse: stormTrooperInverse,
  vader: vader,
  villa: villa,
  woSheet: woSheet,
}
