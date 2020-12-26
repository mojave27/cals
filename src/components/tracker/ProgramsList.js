/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { retrievePrograms } from '../../api/programsApi'
import TrackerContext from '../../context/TrackerContext'
import { isEmpty } from 'lodash'
import { gridStyles } from '../../styles/gridStyles'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  }
}))

const ProgramsList = props => {
  const [program, setProgram] = useState({})

  let trackerContext = useContext(TrackerContext)
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  let { gridContainer, gridItem } = gridStyles(themeContext.theme)

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await retrievePrograms()
      trackerContext.updatePrograms(response)
    }

    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleProgramSelect = id => {
    clearSelectedProgram()
    props.select(id)
  }


  const clearSelectedProgram = () => {
    setProgram({})
  }

  //TODO: add fa icon for previewing and for selecting
  //      also allows select via just clicking the card
  const renderPrograms = programs => {
    if (programs && programs.length > 0) {
      return (
        <Container style={{padding:'25px'}}>
        <Grid container spacing={1}>
          {programs.map(program => {
            return (
              <Grid item xs={12} sm={4} key={`${program.id}`}>
                <Card className={classes.root} onClick={() => handleProgramSelect(program.id)}>
                  <CardHeader
                    title={program.name ? program.name : '-'}
                    subheader={program.description ? program.description : '-'}
                  />
                </Card>
              </Grid>
            )
          })}
        </Grid>
        </Container>
      )
    } else {
      return <div css={gridItem}></div>
    }
  }

  return trackerContext.programs.length <= 0 ? (
    <BasicSpinner show={true} />
  ) : isEmpty(program) ? (
    <React.Fragment>
      <div css={gridContainer}>
        {renderPrograms(trackerContext.programs)}
      </div>
    </React.Fragment>
  ) : (
    null
  )
}

export default ProgramsList
