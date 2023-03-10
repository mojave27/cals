import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core';


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
  errorContrastText: { backgroundColor: theme.palette.error.dark, color: theme.palette.error.contrastText },
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
  primaryContrastText: { backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText },
  secondaryLight: { backgroundColor: theme.palette.secondary.light },
  secondaryMain: { backgroundColor: theme.palette.secondary.main },
  secondaryDark: { backgroundColor: theme.palette.secondary.dark },
  secondaryContrastText: { backgroundColor: theme.palette.secondary.dark, color: theme.palette.secondary.contrastText },
  actionHover: { backgroundColor: theme.palette.action.hover },
  grey50: { backgroundColor: theme.palette.grey[50], color: theme.palette.grey[900] },
  grey100: { backgroundColor: theme.palette.grey[100], color: theme.palette.grey[900] },
  grey200: { backgroundColor: theme.palette.grey[200], color: theme.palette.grey[900] },
  grey300: { backgroundColor: theme.palette.grey[300], color: theme.palette.grey[900] },
  grey400: { backgroundColor: theme.palette.grey[400] },
  grey500: { backgroundColor: theme.palette.grey[500] },
  grey600: { backgroundColor: theme.palette.grey[600] },
  grey700: { backgroundColor: theme.palette.grey[700] },
  grey800: { backgroundColor: theme.palette.grey[800] },
  grey900: { backgroundColor: theme.palette.grey[900] },
  greyA100: { backgroundColor: theme.palette.grey.A100, color: theme.palette.grey[900] },
  greyA200: { backgroundColor: theme.palette.grey.A200 },
  greyA400: { backgroundColor: theme.palette.grey.A400 },
  greyA700: { backgroundColor: theme.palette.grey.A700 },
  
  highlightYellow: { backgroundColor: theme.highlightYellow.hex, color: theme.highlightYellow.contrastText },
  highlightGreen: { backgroundColor: theme.highlightGreen.hex, color: theme.highlightGreen.contrastText },
  darkText: { backgroundColor: '#fff', color: theme.darkText.hex },
  color5: { backgroundColor: theme.color5.hex, color: theme.color5_text.hex },
  color4: { backgroundColor: theme.color4.hex, color: theme.color4_text.hex },
  color3: { backgroundColor: theme.color3.hex, color: theme.color3_text.hex },
  color2: { backgroundColor: theme.color2.hex, color: theme.color2_text.hex },
  color1: { backgroundColor: theme.color1.hex, color: theme.color1_text.hex },
}));

const MuiPalette = props => {
  let themeContext = useContext(ThemeContext)
  let classes = useStyles(themeContext)

  return (
    <div style={{width:'300px'}}>
      <Grid container spacing={1} justify='center' direction='row' alignContent="center">
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.primaryLight}`}>primary.light</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.primaryMain}`}>primary.main</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.primaryDark}`}>primary.dark</Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.primaryContrastText}`}>primary.contrastText</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.secondaryContrastText}`}>secondary.contrastText</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.errorContrastText}`}>error.contrastText</Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.secondaryLight}`}>secondary.light</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.secondaryMain}`}>secondary.main</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.secondaryDark}`}>secondary.dark</Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.infoLight}`}>info.light</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.infoMain}`}>info.main</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.infoDark}`}>info.dark</Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.successLight}`}>success.light</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.successMain}`}>success.main</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.successDark}`}>success.dark</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.warningLight}`}>warning.light</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.warningMain}`}>warning.main</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.warningDark}`}>warning.dark</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.errorLight}`}>error.light</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.errorMain}`}>error.main</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.errorDark}`}>error.dark</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.actionHover}`}>action.hover</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey50}`}>grey.50</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey100}`}>grey.100</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey200}`}>grey.200</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey300}`}>grey.300</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey400}`}>grey.400</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey500}`}>grey.500</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey600}`}>grey.600</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey700}`}>grey.700</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey800}`}>grey.800</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.grey900}`}>grey.900</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.greyA100}`}>grey.A100</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.greyA200}`}>grey.A200</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.greyA400}`}>grey.A400</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
      <Box className={`${classes.box} ${classes.greyA700}`}>grey.A700</Box>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.highlightYellow}`}>highlightYellow</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.highlightGreen}`}>highlightGreen</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.darkText}`}>darkText</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.color5}`}>color5</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.color4}`}>color4</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.color3}`}>color3</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.color2}`}>color2</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={`${classes.box} ${classes.color1}`}>color1</Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default MuiPalette
