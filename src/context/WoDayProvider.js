import React from 'react'
import WoDayContext from './WoDayContext'
import {
  findIndexOfStringId,
  removeItemFromArrayByIndex,
  updateItemById,
} from '../components/modules/common/utilties/ArrayUtils'
import { cloneDeep } from 'lodash'
import { retrieve as fetchWoDays, updateWoDay } from '../api/wodaysApi'

const currentDate = () => {
  let date = new Date()
  return {
    day: date.getDate().toString(),
    month: date.getMonth().toString(),
    year: date.getFullYear().toString(),
  }
}

const emptyWorkout = {
  exerciseGroups: [{ id: 0, exercises: [] }],
  sets: [{ id: 0, exerciseGroups: [{ id: 0, exercises: [] }] }],
}

export const emptyWoDay = {
  id: '',
  date: currentDate(),
  notes: '',
  duration: '0',
  goals: '',
  weight: '',
  energy: 10,
  sleep: 10,
  cardio: {
    headers: [
      'delete',
      'type',
      'targets',
      'duration',
      'distance',
      'heart rate',
    ],
    exercises: [],
  },
  workouts: [],
  activeWo: -1,
  wo: () => {
    if(this.activeWo >= 0) return this.workouts[this.activeWo]
    return null
  },
}

class WoDayProvider extends React.Component {
  state = {
    woday: { ...emptyWoDay },
    wodays: [],
  }

  componentDidMount = async () => {
    let wodays = await fetchWoDays()
    this.setState({ wodays })
  }

  saveWoDayInWoDaysList = (woday) => {
    let wodays = [...this.state.wodays]
    if (woday.id) {
      let index = findIndexOfStringId(woday.id, wodays)
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
    console.log('saving woday')
    let savedWoDay = await updateWoDay(this.state.woday)
    await this.setState((prevState) => {
      let updatedWoDay = prevState.woday
      updatedWoDay.id = savedWoDay.id
      return { woday: updatedWoDay }
    })
  }

  isWoDayInList = () => {
    let answer =
      findIndexOfStringId(this.state.woday.id, this.state.wodays) === -1
        ? false
        : true
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
          updateWoDay: (woday) => {
            this.setState({ woday })
          },
          setEmptyWoDay: async () => {
            let woday = cloneDeep(emptyWoDay)
            // woday.id = generateNewId(this.state.wodays)
            await this.setState({ woday: woday })
          },
          getWorkout: (index) => {
            return cloneDeep(this.state.woday.workouts[index])
          },
          addEmptyWorkout: () => {
            const woday = Object.assign({}, this.state.woday)
            let workout = cloneDeep(emptyWorkout)
            woday.workouts.push(workout)
            this.setState({ woday }) 
          },
          removeWorkout: index => {
            const woday = Object.assign({}, this.state.woday)
            const updatedWorkouts = removeItemFromArrayByIndex(index, woday.workouts)
            woday.workouts = updatedWorkouts
            this.setState({ woday }) 
          },
          addSet: (set) => {
            const woday = Object.assign({}, this.state.woday)
            woday.set.push(set)
            this.setState({ woday })
          },
          updateSetsForWoDay: (sets) => {
            const woday = Object.assign({}, this.state.woday)
            woday.sets = sets
            this.setState({ woday })
          },

          wodays: this.state.wodays,
          updateWoDays: (wodays) => {
            this.setState({ wodays })
          },
          saveWoDayInWoDaysList: this.saveWoDayInWoDaysList,
          clearWoDays: () => {
            this.setState({ wodays: [] })
          },
        }}
      >
        {this.props.children}
      </WoDayContext.Provider>
    )
  }
}

export default WoDayProvider
