import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  item: {
    height: '50',
    maxWidth: '75px',
    textAlign: 'center',
    padding: '5px 0px',
    borderRadius: 1,
    fontWeight: '700',
    margin: 'auto',
  },
  itemWithWo: {
    backgroundColor: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.light
        case 'dark':
          return theme.palette.primary.main
        default:
          return theme.color4.hex
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.contrastText
        case 'dark':
          return '#FFF'
        default:
          return theme.color4_text.hex
      }}
    },
    margin: 'auto',
  },
  itemWithCardio: {
    backgroundColor: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.light
        case 'dark':
          return theme.palette.primary.main
        default:
          return theme.color4.hex
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.contrastText
        case 'dark':
          return '#FFF'
        default:
          return theme.color4_text.hex
      }}
    },
    margin: 'auto',
  },
  itemCard: {
    border:'1px solid #999', 
    paddingBottom:'5px',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey["600"] : theme.color3.hex
  },
  cardContent: {
    padding: '3px',
    '&:last-child': {
      paddingBottom: '5px'
    }
  },
  cardActions: { padding: '1px' },
  currentDay: {
    border: '1px solid #eee',
    backgroundColor: () => {
      switch(theme.name) {
        case 'light':
          return theme.palette.success[theme.palette.type]
        case 'dark':
          return theme.palette.success[theme.palette.type]
        default: 
          return theme.color2.hex
      }
    }
  },
  standardDay: {
    border: '1px solid #eee'
  },
  cardioBadge: {
    color: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
        switch(theme.name){
          case 'dark':
          return '#FFF'
        default:
          return theme.palette.primary.contrastText
      }}
    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tableContaner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    '& .MuiTableContainer-root': {
      width: '100%',
      overflowX: 'visible',
    },
  },
  tableHead: {
    color: theme.color4_text.hex,
    backgroundColor: theme.color4.hex,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },
}))

const CalendarItemCard = ({ item, children }) => {
  const classes = useStyles()

  const showItem = () => {
    if (item === null) return false
    if (item.show) return true
    return true
  }

  return showItem() ? (
    <Card className={classes.itemCard}>
      <CardContent classes={{ root: classes.cardContent }}>
        {children}
      </CardContent>
    </Card>
  ) : (
    ''
  )
}

export default CalendarItemCard

