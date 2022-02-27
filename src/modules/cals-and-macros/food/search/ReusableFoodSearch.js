import React, { useEffect, useState } from 'react'
import { Confirm } from 'semantic-ui-react'
import retrieveFoodList from 'api/cals-and-macros/retrieveFoodList'
import FoodListTable from 'modules/cals-and-macros/table/FoodListTable/FoodListTable'
import { filterItemsByNameProperty as filterItems, retrieveItemById } from 'components/modules/common/utilties/ArrayUtils'
import { sortByStringProperty } from 'list-utils'

import FormButton from 'components/inputs/FormButton'
import TextInputWithCancel from 'components/inputs/TextInputWithCancel'
import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from 'components/spinners/BasicSpinner'

const useStyles = makeStyles(theme => ({
  box: {
    flexGrow: 1,
    padding: '10px'
  }
}))

const ReusableFoodSearch = props => {
  const classes = useStyles()
  const [foodList, setFoodList] = useState([])
  const [message, setMessage] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    retrieve()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModalCancel = () => {
    setShowConfirm(false)
  }

  const handleModalConfirm = () => {
    handleModalCancel()
  }

  const handleClearSearch = () => {
    console.log('clearing search')
    setSearchValue('')
  }

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

  const handleRowSelect = (id) => {
    console.log(id)
    // get foodItem from foodList based on id
    let foodItem = retrieveItemById(id, foodList)
    props.rowSelect(foodItem)
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
          <TextInputWithCancel
            id='search'
            name='search'
            data={searchValue}
            onChange={handleInputChange}
            handleCancel={handleClearSearch}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormButton onClick={props.onClose} value={'close'} />
        </Grid>
        <Grid item xs={12}>
            <React.Fragment>
              <FoodListTable foodList={filterItems(searchValue, foodList, 'description')} rowClick={handleRowSelect} />
            </React.Fragment>
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

export default ReusableFoodSearch
