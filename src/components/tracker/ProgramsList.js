/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { retrievePrograms } from '../../api/programsApi'
import TrackerContext from '../../context/TrackerContext'
// import { retrieveProgramById } from '../../api/programsApi'
import ProgramHighlightCard from '../programs/ProgramHighlightCard'
import ProgramOverview from '../programs/ProgramOverview'
import { isEmpty } from 'lodash'
import { gridContainerSingleColumn, gridItem } from '../../styles/gridStyles'


const ProgramsList = props => {
  let trackerContext = useContext(TrackerContext)
  const [program, setProgram] = useState({})

  const handleProgramSelect = event => {
    let id = event.currentTarget.id
    clearSelectedProgram()
    props.select(id)
  }

  // const handleProgramView = async event => {
  //   let id = event.currentTarget.id
  //   await retrieve(id)
  // }

  const clearSelectedProgram = () => {
    setProgram({})
  }

  // const retrieve = programId => {
  //   async function fetchProgram(programId) {
  //     const response = await retrieveProgramById(programId)
  //     setProgram(response.fullProgram)
  //   }
  //   fetchProgram(programId)
  // }

  //TODO: add fa icon for previewing and for selecting
  //      also allows select via just clicking the card
  const ProgramRow = program => {
    let index = program.id
    return (
      <ProgramHighlightCard
        key={index}
        program={program}
        onClick={handleProgramSelect}
        // onClick={handleProgramView}
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
      const response = await retrievePrograms()
      if (!didCancel) {
        // Ignore if we started fetching something else
        trackerContext.updatePrograms(response)
        // setPrograms(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //   TODO: fix this conditional render.
  return isEmpty(program) ? (
    <React.Fragment>
      <div css={gridContainerSingleColumn}>{renderPrograms(trackerContext.programs)}</div>
    </React.Fragment>
  ) : (
    <ProgramOverview select={true} handleClose={clearSelectedProgram} selectProgram={handleProgramSelect} program={program} />
  )

}

export default ProgramsList
