import React, { useContext, useEffect, useState } from 'react'
import { Confirm } from 'semantic-ui-react'
import retrieveFoodList from '../../../../api/cals-and-macros/retrieveFoodList'
import FoodListTable from '../../table/FoodListTable/FoodListTable'
import { sortByStringProperty } from 'list-utils'

import FormButton from '../../../inputs/FormButton'
import TextInput from '../../../inputs/TextInput'
import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from '../../../spinners/BasicSpinner'
import ThemeContext from '../../../../context/ThemeContext'

const useStyles = makeStyles(theme => ({
  box: {
    flexGrow: 1,
    padding: '10px'
  }
}))

const FoodSearch = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [foodList, setFoodList] = useState([])
  const [message, setMessage] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    retrieve()
  }, [])

  const handleModalCancel = () => {
    setShowConfirm(false)
  }
  const handleModalConfirm = () => {
    handleModalCancel()
  }

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

  const handleClick = () => {
    setShowSpinner(true)
    retrieve()
  }

  const handleRowSelect = (rowId, event) => {
    event.preventDefault()
    props.rowSelect(foodList[rowId])
  }

  const retrieve = () => {
    retrieveFoodList(searchValue)
      .then(apiSearchResults => {
        let foodList = []
        let error = true
        let message = 'No items found for search term.'
        let initialFoodList = apiSearchResults

        if (initialFoodList && initialFoodList.length > 0) {
          error = false
          message = ''

          foodList = initialFoodList.map(foodItem => {
            return {
              active: false,
              ...foodItem
            }
          })

          let sorted = sortList(foodList, 'description')
          foodList = sorted
        }

        setFoodList(foodList)
        setShowSpinner(false)
        setShowConfirm(error)
        setMessage(message)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const sortList = (list, propertyName) => {
    const IGNORE_CASE = true
    let sorted = sortByStringProperty(list, propertyName, IGNORE_CASE)
    return sorted
  }

  // const handleKeyPress = e => {
  //   if (e.key === 'Enter') {
  //     handleClick()
  //   }
  // }

  const show = () => {
    if (foodList.length <= 0) return true
    if (showSpinner) return true
    return false
  }

  return (
    <Box className={classes.box}>
      <BasicSpinner show={show()} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextInput
            id='search'
            name='search'
            // data={this.state.meal.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormButton value={'search'} onClick={handleClick} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormButton onClick={props.onClose} value={'close'} />
        </Grid>
        <Grid item xs={12}>
          {foodList.length > 0 ? (
            <React.Fragment>
              <FoodListTable foodList={foodList} rowClick={handleRowSelect} />
            </React.Fragment>
          ) : null}
        </Grid>
        <Confirm
          open={showConfirm}
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
          content={message}
          size='tiny'
        />
      </Grid>
    </Box>
  )
}

export default FoodSearch
