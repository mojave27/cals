import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { navigate } from '@reach/router'
import { useState, useEffect } from 'react'
import { retrievePrograms as retrieve } from '../../api/programsApi'
import { retrieveProgramById as retrieveProgram } from '../../api/programsApi'
import ProgramHighlightCard from './ProgramHighlightCard'
import ProgramOverview from './ProgramOverview'
import { isEmpty } from 'lodash'
import { formButton } from '../../styles/main-styles'
import { gridContainer, gridItem } from '../../styles/gridStyles'

const container = css({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: '10px'
})


const Programs = props => {
  const [routeKey, setRouteKey] = useState(0)
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState({})

  const forceUpdate = routeKey => {
    setSelectedProgram({})
    setRouteKey(routeKey)
  }

  const handleProgramSelect = event => {
    let id = event.currentTarget.id
    const program = retrieveFullProgram(id)
    setSelectedProgram(program)
  }

  const clearSelectedProgram = () => {
    setSelectedProgram({})
  }

  const retrieveFullProgram = programId => {
    async function fetchProgram(programId) {
      const response = await retrieveProgram(programId)
      setSelectedProgram(response.fullProgram)
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
        setPrograms(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

  const handleAddProgramClick = async () => {
    await navigate(`/program-form`)
  }


  //   TODO: fix this conditional render.
  return props.location.key !== routeKey ? (
    forceUpdate(props.location.key)
  ) : isEmpty(selectedProgram) ? (
    <React.Fragment>
      <button
        css={formButton}
        style={{ float: 'none', marginBottom: '10px' }}
        onClick={handleAddProgramClick}
      >
        Add Program
      </button>
      {/* <div css={gridContainer, container}>{renderPrograms(programs)}</div> */}
      <div css={gridContainer}>{renderPrograms(programs)}</div>
    </React.Fragment>
  ) : (
    <ProgramOverview handleClose={clearSelectedProgram} program={selectedProgram} />
  )

}

export default Programs
