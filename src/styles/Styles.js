
export const basicButtonSmall = (theme) => {
  const { mobile } = theme
  return {
    backgroundColor: theme.color4.hex,
    border: `1px solid ${theme.color3.hex}`,
    borderRadius: '2px',
    color: theme.color4_text.hex,
    fontSize: '.9em',
    margin: '5px',
    // padding: '1px 5px',
    width: `${mobile === true ? '100%' : 'auto'}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color3.hex,
      color: theme.color3_text.hex
    }
  }
}

export const basicButton = (theme) => {
  const { mobile } = theme
  return {
  padding: '6px 20px',
  fontSize: 'inherit',
  backgroundColor: theme.color4.hex,
  color: theme.color4_text.hex,
  border: `1px solid ${theme.color3.hex}`,
  borderRadius: '2px',
  width: `${mobile === true ? '80%' : 'auto'}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex
  }}
}