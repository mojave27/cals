import React, { useEffect, useState } from 'react'
import { Button, Confirm, Input } from 'semantic-ui-react'
import retrieveFoodList from '../../../../api/cals-and-macros/retrieveFoodList'
import FoodListTable from '../../table/FoodListTable/FoodListTable'
import styles from './FoodSearch.module.css'
import { sortByStringProperty } from 'list-utils'

const FoodSearch = props => {
  const [foodList, setFoodList] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

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
    setLoading(true)
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
        setLoading(false)
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <div className={styles.container}>
      <Input
        loading={loading}
        icon='search'
        iconPosition='left'
        placeholder='search...'
        value={searchValue}
        onChange={handleInputChange}
        className={styles.searchInput}
        onKeyPress={handleKeyPress}
        size='large'
        disabled={true}
      />
      {/* <br /> */}
      <Button
        color='orange'
        onClick={handleClick}
        disabled={false}
        style={{ marginLeft: '15px' }}
      >
        search
      </Button>
      <Button color='red' onClick={props.onClose} style={{ float: 'right' }}>
        close
      </Button>
      <br />
      {foodList.length > 0 ? (
        <React.Fragment>
          <FoodListTable
            foodList={foodList}
            rowClick={handleRowSelect}
          />
        </React.Fragment>
      ) : null}
      <Confirm
        open={showConfirm}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        content={message}
        size='tiny'
      />
    </div>
  )
}

export default FoodSearch
