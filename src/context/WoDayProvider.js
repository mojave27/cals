import React from 'react'
import WoDayContext from './WoDayContext'
import {
  findIndexOfId,
  updateItemById
} from '../components/ArrayUtils'
import { cloneDeep } from 'lodash'
import {
  addWoDay,
  retrieve as fetchWoDays,
  retrieveWoDayById,
  updateWoDay
} from '../api/wodaysApi'

const currentDate = () => {
  let date = new Date()
  return {
    day: date.getDate().toString(),
    month: date.getMonth().toString(),
    year: date.getFullYear().toString()
  }
}

export const emptyWoDay = {
  id: -1,
  date: currentDate(),
  duration: '0',
  goals: '',
  weight: '',
  energy: 10,
  sleep: 10,
  cardio: {
    headers: ['delete', 'type', 'duration', 'distance', 'heart rate'],
    exercises: []
  },
  wo: {
    exerciseGroups: [{ id: 0, exercises: [] }],
    sets: [{ id: 0, exerciseGroups: [{ id: 0, exercises: [] }] }]
  }
}

class WoDayProvider extends React.Component {
  state = {
    woday: { ...emptyWoDay },
    wodays: []
  }

  componentDidMount = async () => {
    let wodays = await fetchWoDays()
    this.setState({ wodays })
  }

  saveWoDayInWoDaysList = woday => {
    let wodays = [...this.state.wodays]
    if (woday.id) {
      let index = findIndexOfId(woday.id, wodays)
      if (index > -1) {
        updateItemById(woday, woday.id, wodays)
      } else {
        wodays.push(woday)
      }
    } else {
      wodays.push(woday)
    }
    this.setState({ wodays })
  }

  saveWoDay = async () => {
    // if(this.isWoDayInList()){
    if(this.state.woday.id === -1){
      let wodayId = await addWoDay(this.state.woday)
      let woday = await retrieveWoDayById(wodayId)
      let wodays = await fetchWoDays()
      this.setState({woday, wodays})
      // this.saveWoDayInWoDaysList(woday)
    } else {
      await updateWoDay(this.state.woday)
    }
  }

  isWoDayInList = () => {
    let answer = (findIndexOfId(this.state.woday.id, this.state.wodays) === -1) ? false : true
    console.log(answer)
    return answer
  }

  render() {
    return (
      <WoDayContext.Provider
        value={{
          woday: this.state.woday,
          copyWoDay: () => {
            return cloneDeep(this.state.woday)
          },
          saveWoDay: this.saveWoDay,
          updateWoDay: woday => {
            this.setState({ woday })
          },
          setEmptyWoDay: () => {
            let woday = cloneDeep(emptyWoDay)
            // woday.id = generateNewId(this.state.wodays)
            this.setState({ woday: woday })
          },
          addSet: set => {
            const woday = Object.assign({}, this.state.woday)
            woday.set.push(set)
            this.setState({ woday })
          },
          updateSetsForWoDay: sets => {
            const woday = Object.assign({}, this.state.woday)
            woday.sets = sets
            this.setState({ woday })
          },

          wodays: this.state.wodays,
          updateWoDays: wodays => {
            this.setState({ wodays })
          },
          saveWoDayInWoDaysList: this.saveWoDayInWoDaysList,
          clearWoDays: () => {
            this.setState({ wodays: [] })
          }
        }}
      >
        {this.props.children}
      </WoDayContext.Provider>
    )
  }
}

export default WoDayProvider
