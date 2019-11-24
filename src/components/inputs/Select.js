import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  customSelect,
  selectItems,
  selectHide,
  selectSelected,
  sameAsSelected
} from '../../styles/main-styles'

class Select extends React.Component {
  state = {
    selectActive: false,
    selected: 0,
  }

  render() {
    return (
      <div css={customSelect} style={{ width: '200px' }} onClick={this.handleSelectClick}>
        <select onChange={this.handleSelectOption}>
          {this.renderOptions()}
        </select>
        <div css={selectSelected}>
          {this.props.options[this.state.selected]}
        </div>
        {this.state.selectActive
        ? <div css={selectItems}>{this.renderOptionsDivs()}</div>
        : <div css={[selectItems, selectHide]}>{this.renderOptionsDivs()}</div>
        }
      </div>
    )
  }

  handleSelectOption = e => {
      this.props.onSelect(e)
      let selected = Number(e.currentTarget.id)
      console.log(selected)
    this.setState({ selected })
  }

  renderOptions = () => {
    return this.props.options.map((opt, index) => {
      return (
        <option value={index} key={index}>
          {opt}
        </option>
      )
    })
  }

  renderOptionsDivs = () => {
    return this.props.options.map((opt, index) => {
      if (index === this.state.selected) {
        return (
          <div css={sameAsSelected} value={index} key={index} onClick={this.handleSelectOption} >
            {opt}
          </div>
        )
      } else {
        return (
          <div id={index} value={index} key={index} onClick={this.handleSelectOption} >
            {opt}
          </div>
        )
      }
    })
  }

  handleSelectClick = () => {
      this.setState( prevState => {
          return { selectActive: !prevState.selectActive }
      })
  }

}

export default Select
