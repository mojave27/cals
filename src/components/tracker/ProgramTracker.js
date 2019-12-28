/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import {
  cardNoHover,
  cardTitle,
  cardInfo,
  closeButton
} from '../../styles/main-styles'
import { tab, tabContent } from '../../styles/programTracker.styles'

//TODO: change to use this.props.program...
const testProgram = {
  name: 'Natties Test',
  description: 'this will be the nattie program',
  id: '1',
  workouts: [
    {
      id: 1,
      name: 'Nattie W1',
      description: 'n/a',
      type: 'pull',
      sets: [
        {
          id: 0,
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'max',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 9,
              reps: 'max',
              name: 'inv row',
              type: 'compound'
            },
            {
              id: 10,
              reps: 'max',
              name: 'leg curl',
              type: 'isolation'
            },
            {
              id: 11,
              reps: 'max',
              name: 'bb curl',
              type: 'isolation'
            }
          ]
        },
        {
          id: 321,
          exercises: [
            {
              id: 0,
              reps: '6-8-10',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'myo reps',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 9,
              reps: 'myo reps',
              name: 'inv row',
              type: 'compound'
            },
            {
              id: 10,
              reps: 'myo reps',
              name: 'leg curl',
              type: 'isolation'
            },
            {
              id: 11,
              reps: 'bb curl',
              name: 'bb curl',
              type: 'isolation'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Nattie W2',
      description: 'n/a',
      type: 'push',
      sets: [
        {
          id: 0,
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'max',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 9,
              reps: 'max',
              name: 'inv row',
              type: 'compound'
            },
            {
              id: 10,
              reps: 'max',
              name: 'leg curl',
              type: 'isolation'
            },
            {
              id: 11,
              reps: 'max',
              name: 'bb curl',
              type: 'isolation'
            }
          ]
        },
        {
          id: 1,
          exercises: [
            {
              id: 0,
              reps: '6-8-10',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'myo reps',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 9,
              reps: 'myo reps',
              name: 'inv row',
              type: 'compound'
            },
            {
              id: 10,
              reps: 'myo reps',
              name: 'leg curl',
              type: 'isolation'
            },
            {
              id: 11,
              reps: 'bb curl',
              name: 'bb curl',
              type: 'isolation'
            }
          ]
        },
        {
          id: 3,
          exercises: [
            {
              id: 15,
              reps: '3x20',
              name: 'calves',
              type: 'isolation'
            }
          ]
        },
        {
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound'
            }
          ],
          id: 341
        }
      ]
    }
  ]
}

const City = props => {
  return props.active ? (
    <div id={props.name} css={tabContent}>
      <h3>{props.name}</h3>
      <p>{props.message}</p>
    </div>
  ) : null
}

const testCities = [
  { id: 0, name: 'London', message: 'London is the capital of England.' },
  { id: 1, name: 'Paris', message: 'Paris is the capital of France.' },
  { id: 2, name: 'Tokyo', message: 'Tokyo is the capital of Japan.' }
]

class ProgramTracker extends React.Component {
  state = {
    cities: [...testCities],
    activeCity: -1
  }

  render() {
    return (
      <div css={cardNoHover} id={testProgram.id}>
        <span css={closeButton} onClick={this.handleClose}>
          &times;
        </span>
        <div css={cardTitle}>{testProgram.name}</div>
        <div css={cardInfo}>{testProgram.description}</div>

        {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
        {/* Tab links */}
        <div css={tab}>{this.renderTabs()}</div>
        {/* <!-- Tab content --> */}
        <div>{this.renderCities()}</div>

        {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}

        {/* <div css={gridContainer}>
          {this.renderWorkouts(this.props.program.workouts)}
          <br />
        </div>
        <button css={formButton} onClick={this.editProgram}>
          Edit
        </button> */}
      </div>
    )
  }

  renderTabs = () => {
    return this.state.cities.map(city => {
      let active = Number(this.state.activeCity) === Number(city.id)
      let className = active ? 'active' : 'inactive'

      return (
        <button
          key={city.id}
          id={city.id}
          className={className}
          name={city.name}
          onClick={this.openCity}
        >
          {city.name}
        </button>
      )
    })
  }

  renderCities = () => {
    return this.state.cities.map(city => {
      let active = Number(this.state.activeCity) === Number(city.id)
      console.log(`active - ${active}`)
      return (
        <City
          active={active}
          key={city.id}
          name={city.name}
          message={city.message}
        />
      )
    })
  }

  openCity = event => {
    // console.log(event.target.name)
    // console.log(event.target.id)
    let id = event.target.id
    this.setState({ activeCity: id })
    //  1. hide all tabContents
    //  2. turn off the active class on all tablinks
    //  3. show the clicked tab's content, add 'active' class to it's tablink.

    // // Declare all variables
    // var i, tabContent, tablinks;

    // // Get all elements with class="tabcontent" and hide them
    // tabContent = document.getElementsByClassName("tabContent");
    // for (i = 0; i < tabContent.length; i++) {
    //   tabContent[i].style.display = "none";
    // }

    // // Get all elements with class="tablinks" and remove the class "active"
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }

    // // Show the current tab, and add an "active" class to the button that opened the tab
    // document.getElementById(cityName).style.display = "block";
    // event.currentTarget.className += " active";
  }

  handleClose = () => {
    // this.props.handleClose()
  }
}

export default ProgramTracker
