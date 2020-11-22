/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { retrievePrograms } from '../../api/programsApi'
import TrackerContext from '../../context/TrackerContext'
import ProgramHighlightCard from '../programs/ProgramHighlightCard'
// import ProgramOverview from '../programs/ProgramOverview'
import { isEmpty } from 'lodash'
import { gridStyles } from '../../styles/gridStyles'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'

const ProgramsList = props => {
  const [program, setProgram] = useState({})

  const themeContext = useContext(ThemeContext)
  let trackerContext = useContext(TrackerContext)
  let { gridContainerSingleColumn, gridItem } = gridStyles(themeContext.theme)

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await retrievePrograms()
      trackerContext.updatePrograms(response)
    }

    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleProgramSelect = event => {
    let id = event.currentTarget.id
    clearSelectedProgram()
    props.select(id)
  }

  const clearSelectedProgram = () => {
    setProgram({})
  }

  //TODO: add fa icon for previewing and for selecting
  //      also allows select via just clicking the card
  const ProgramRow = program => {
    let index = program.id
    return (
      <ProgramHighlightCard
        key={index}
        program={program}
        onClick={handleProgramSelect}
      />
    )
  }

  const renderPrograms = programs => {
    if (programs && programs.length > 0) {
      return programs.map(program => {
        return ProgramRow(program)
      })
    } else {
      return <div css={gridItem}></div>
    }
  }

  return trackerContext.programs.length <= 0 ? (
    <BasicSpinner />
  ) : isEmpty(program) ? (
    <React.Fragment>
      <div css={gridContainerSingleColumn}>
        {renderPrograms(trackerContext.programs)}
      </div>
    </React.Fragment>
  ) : (
    null
    // <ProgramOverview
    //   select={true}
    //   handleClose={clearSelectedProgram}
    //   selectProgram={handleProgramSelect}
    //   program={program}
    // />
  )
}

export default ProgramsList
