import React, { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { navigate } from '@reach/router'
import { useState, useEffect } from 'react'
import { retrievePrograms as retrieve } from '../../api/programsApi'
import { retrieveProgramById as retrieveProgram } from '../../api/programsApi'
import ProgramContext from '../../context/ProgramContext'
import ProgramHighlightCard from './ProgramHighlightCard'
import ProgramOverview from './ProgramOverview'
import { isEmpty } from 'lodash'
import { formButton } from '../../styles/main-styles'
import ThemeContext from '../../context/ThemeContext'
import { gridStyles } from '../../styles/gridStyles'


const Programs = props => {
  const [routeKey, setRouteKey] = useState(0)

  const themeContext = useContext(ThemeContext)
  let programContext = useContext(ProgramContext)
  let { gridContainerSingleColumn, gridItem } = gridStyles(themeContext.theme)

  const forceUpdate = routeKey => {
    clearSelectedProgram()
    setRouteKey(routeKey)
  }

  const handleProgramSelect = async event => {
    let id = event.currentTarget.id
    const program = await retrieveFullProgram(id)
    programContext.updateProgram(program)
  }

  const clearSelectedProgram = () => {
    programContext.updateProgram({})
  }

  const retrieveFullProgram = programId => {
    async function fetchProgram(programId) {
      const response = await retrieveProgram(programId)
      programContext.updateProgram(response.fullProgram)
    }
    fetchProgram(programId)
  }

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

  useEffect(() => {
    let didCancel = false

    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        // Ignore if we started fetching something else
        programContext.updatePrograms(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddProgramClick = async () => {
    await navigate(`/program-form`)
  }

  //   TODO: fix this conditional render.
  return props.location.key !== routeKey ? (
    forceUpdate(props.location.key)
  ) : isEmpty(programContext.program) ? (
    <React.Fragment>
      <button
        css={formButton}
        style={{ float: 'none', marginBottom: '10px' }}
        onClick={handleAddProgramClick}
      >
        Add Program
      </button>
      <div css={gridContainerSingleColumn}>{renderPrograms(programContext.programs)}</div>
    </React.Fragment>
  ) : (
    <ProgramOverview edit={true} handleClose={clearSelectedProgram} program={programContext.program} />
  )

}

export default Programs
