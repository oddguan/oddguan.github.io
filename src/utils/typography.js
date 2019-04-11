import Typography from "typography"
import stannes from "typography-theme-st-annes"

stannes.baseFontSize = '18px'
stannes.overrideThemeStyles = () => ({
  'body, h1, h2, h3, h4, h5, h6': {
    color: "#ddd",
  },
  blockquote: {
    borderColor: '#c678dd',
    color: '#aaa'
  },
  a: {
    color: "#98c379",
  },
  "a:hover": {
    color: "#56b6c2",
  },
})

const typography = new Typography(stannes)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
