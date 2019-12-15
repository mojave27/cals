
export const stormTrooperTheme = {
  color1: {
    hex: '#EBF0F2',
    rgba: alpha => buildRgba(235, 240, 242, alpha)
  },
  get color1_text() { return this.color5 },
  color2: {
    hex: '#D2D7D9',
    rgba: alpha => buildRgba(210, 215, 217, alpha)
  },
  get color2_text() { return this.color5 },
  color3: {
    hex: '#9FA4A6',
    rgba: alpha => buildRgba(159, 164, 166, alpha)
  },
  get color3_text() { return this.color5 },
  color4: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  },
  get color4_text() { return this.color1 },
  color5: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  },
  get color5_text() { return this.color1 },
  color5_highlight: {
    hex: '#0D0D0D',
    rgba: alpha => buildRgba(13, 13, 13, alpha)
  }
}

export const themeOne = {
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