import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  box: {
    height: '100px',
    width: '100px',
    textAlign: 'center'
  },
  errorLight: { backgroundColor: theme.palette.error.light },
  errorMain: { backgroundColor: theme.palette.error.main },
  errorDark: { backgroundColor: theme.palette.error.dark },
  warningLight: { backgroundColor: theme.palette.warning.light },
  warningMain: { backgroundColor: theme.palette.warning.main },
  warningDark: { backgroundColor: theme.palette.warning.dark },
  infoLight: { backgroundColor: theme.palette.info.light },
  infoMain: { backgroundColor: theme.palette.info.main },
  infoDark: { backgroundColor: theme.palette.info.dark },
  successLight: { backgroundColor: theme.palette.success.light },
  successMain: { backgroundColor: theme.palette.success.main },
  successDark: { backgroundColor: theme.palette.success.dark },
  primaryLight: { backgroundColor: theme.palette.primary.light },
  primaryMain: { backgroundColor: theme.palette.primary.main },
  primaryDark: { backgroundColor: theme.palette.primary.dark },
  secondaryLight: { backgroundColor: theme.palette.secondary.light },
  secondaryMain: { backgroundColor: theme.palette.secondary.main },
  secondaryDark: { backgroundColor: theme.palette.secondary.dark },
  actionHover: { backgroundColor: theme.palette.action.hover },
  grey50: { backgroundColor: theme.palette.grey[50] },
  grey100: { backgroundColor: theme.palette.grey[100] },
  grey200: { backgroundColor: theme.palette.grey[200] },
  grey300: { backgroundColor: theme.palette.grey[300] },
  grey400: { backgroundColor: theme.palette.grey[400] },
  grey500: { backgroundColor: theme.palette.grey[500] },
  grey600: { backgroundColor: theme.palette.grey[600] },
  grey700: { backgroundColor: theme.palette.grey[700] },
  grey800: { backgroundColor: theme.palette.grey[800] },
  grey900: { backgroundColor: theme.palette.grey[900] },
  greyA100: { backgroundColor: theme.palette.grey.A100 },
  greyA200: { backgroundColor: theme.palette.grey.A200 },
  greyA400: { backgroundColor: theme.palette.grey.A400 },
  greyA700: { backgroundColor: theme.palette.grey.A700 },

}));

const MuiPalette = props => {
  let context = useContext(ThemeContext)
  let classes = useStyles(context.theme)
  let palette = context.theme.palette

  return (
    <div>
      <Box className={`${classes.box} ${classes.primaryLight}`}>primary.light</Box>
      <Box className={`${classes.box} ${classes.primaryMain}`}>primary.main</Box>
      <Box className={`${classes.box} ${classes.primaryDark}`}>primary.dark</Box>
      <Box className={classes.box} style={{backgroundColor: palette.primary.contrastText, color: palette.primary.dark}}>primary.contrastText</Box>
      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.secondaryLight}`}>secondary.light</Box>
      <Box className={`${classes.box} ${classes.secondaryMain}`}>secondary.main</Box>
      <Box className={`${classes.box} ${classes.secondaryDark}`}>secondary.dark</Box>
      <Box className={classes.box} style={{backgroundColor: palette.secondary.contrastText, color: palette.secondary.dark}}>secondary.contrastText</Box>

      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.infoLight}`}>info.light</Box>
      <Box className={`${classes.box} ${classes.infoMain}`}>info.main</Box>
      <Box className={`${classes.box} ${classes.infoDark}`}>info.dark</Box>
      {/* <Box className={`${classes.box}${classes.warning}`}>warning.contrastText</Box> */}
      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.successLight}`}>success.light</Box>
      <Box className={`${classes.box} ${classes.successMain}`}>success.main</Box>
      <Box className={`${classes.box} ${classes.successDark}`}>success.dark</Box>
      {/* <Box className={`${classes.box}${classes.warning}`} style={{backgroundColor: palette.info.contrastText, color: palette.info.dark}}>info.contrastText</Box> */}
      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.warningLight}`}>warning.light</Box>
      <Box className={`${classes.box} ${classes.warningMain}`}>warning.main</Box>
      <Box className={`${classes.box} ${classes.warningDark}`}>warning.dark</Box>
      {/* <Box className={`${classes.box}${classes.warning}`} style={{backgroundColor: palette.success.contrastText, color: palette.success.dark}}>success.contrastText</Box> */}
      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.errorLight}`}>error.light</Box>
      <Box className={`${classes.box} ${classes.errorMain}`}>error.main</Box>
      <Box className={`${classes.box} ${classes.errorDark}`}>error.dark</Box>
      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.actionHover}`}>action.hover</Box>
      <Box>{'............'}</Box>
      <Box className={`${classes.box} ${classes.grey50}`}>grey.50</Box>
      <Box className={`${classes.box} ${classes.grey100}`}>grey.100</Box>
      <Box className={`${classes.box} ${classes.grey200}`}>grey.200</Box>
      <Box className={`${classes.box} ${classes.grey300}`}>grey.300</Box>
      <Box className={`${classes.box} ${classes.grey400}`}>grey.400</Box>
      <Box className={`${classes.box} ${classes.grey500}`}>grey.500</Box>
      <Box className={`${classes.box} ${classes.grey600}`}>grey.600</Box>
      <Box className={`${classes.box} ${classes.grey700}`}>grey.700</Box>
      <Box className={`${classes.box} ${classes.grey800}`}>grey.800</Box>
      <Box className={`${classes.box} ${classes.grey900}`}>grey.900</Box>
      <Box className={`${classes.box} ${classes.greyA100}`}>grey.A100</Box>
      <Box className={`${classes.box} ${classes.greyA200}`}>grey.A200</Box>
      <Box className={`${classes.box} ${classes.greyA400}`}>grey.A400</Box>
      <Box className={`${classes.box} ${classes.greyA700}`}>grey.A700</Box>
    </div>
  )
}

export default MuiPalette
