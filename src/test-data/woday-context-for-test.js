import { cloneDeep } from 'lodash'

const currentDate = () => {
  let date = new Date()
  return {
    day: date.getDate().toString(),
    month: date.getMonth().toString(),
    year: date.getFullYear().toString()
  }
}

var emptyWoDay = {
  id: '',
  date: currentDate(),
  notes: '',
  duration: '0',
  goals: '',
  weight: '',
  energy: 10,
  sleep: 10,
  cardio: {
    headers: ['delete', 'type', 'targets', 'duration', 'distance', 'heart rate'],
    exercises: []
  },
  wo: {
    exerciseGroups: [{ id: 0, exercises: [] }],
    sets: [{ id: 0, exerciseGroups: [{ id: 0, exercises: [] }] }]
  }
}

export const context = {
  woday: this.state.woday,
  copyWoDay: () => {
    return cloneDeep(this.state.woday)
  },
  saveWoDay: this.saveWoDay,
  updateWoDay: woday => {
    this.setState({ woday })
  },
  setEmptyWoDay: async () => {
    let woday = cloneDeep(emptyWoDay)
    // woday.id = generateNewId(this.state.wodays)
    await this.setState({ woday: woday })
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
}