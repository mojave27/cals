import React from 'react'
import WoDayContext from './WoDayContext'
import { findIndexOfId, updateItemById } from '../components/ArrayUtils'
import { cloneDeep } from 'lodash'

export const emptyWoDay = {
    id:-1,
    date: {
        "day": "01",
        "month": "01",
        "year":"2020"
    },
    goals:'',
    weight:'',
    energy: 50,
    sleep: 50,
    cardio:{
        "headers": ["type", "duration", "distance", "heart rate"],
        'exercises': []
    },
    wo: {
        exercises: [],
        sets: []
    }
}


class WoDayProvider extends React.Component {
    state = {
        woday: {...emptyWoDay},
        wodays: []
    }

    render() {
        return (
            <WoDayContext.Provider value={{
                woday: this.state.woday,
                copyWoDay: () => {
                    return cloneDeep(this.state.woday)
                },
                updateWoDay: woday => {
                    this.setState({ woday })
                },
                setEmptyWoDay: () => {
                    this.setState({ woday: emptyWoDay })
                },
                addSet: set => {
                    const woday = Object.assign({}, this.state.woday)
                    woday.set.push(set)
                    this.setState({woday})
                },
                updateSetsForWoDay: sets => {
                    const woday = Object.assign({}, this.state.woday)
                    woday.sets = sets
                    this.setState({woday})
                },

                wodays: this.state.wodays,
                updateWoDays: wodays => {
                    this.setState({ wodays })
                },
                saveWoDayInWoDaysList: woday => {
                    let wodays = [...this.state.wodays]
                    if ( woday.id ) {
                        let index = findIndexOfId(woday.id, wodays)
                        if (index > -1) {
                            updateItemById(woday, woday.id, wodays)
                        }else{
                            wodays.push(woday)
                        }
                    }else{
                        wodays.push(woday)
                    }
                    this.setState({wodays})
                },
                clearWoDays: () => {
                    this.setState({ wodays: [] })
                }
            }}>
                {this.props.children}
            </WoDayContext.Provider>
        )
    }

}

export default WoDayProvider