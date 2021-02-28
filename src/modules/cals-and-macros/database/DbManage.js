import React, { useEffect, useState } from 'react'
import retrieveFoodList from 'api/retrieveFoodList'
import { postFoodItem } from 'api/postFoodItem'
import deleteFoodItem from 'api/deleteFoodItem'
import EditableTable from 'modules/cals-and-macros/table/EditableTable/EditableTable'
import styles from  'modules/cals-and-macros/database/DbManage.module.css'
import Form from 'modules/cals-and-macros/database/DbEntryForm'
import Modal from 'components/modules/common/components/Modal'
import { removeItemById } from 'components/modules/common/utilties/ArrayUtils'

const foodItemHeaders = [
  { value: 'description', cellAttributes: [] },
  { value: 'quantity', cellAttributes: [] },
  { value: 'unit', cellAttributes: [] },
  { value: 'calories', cellAttributes: [] },
  { value: 'proteinGrams', cellAttributes: [] },
  { value: 'carbGrams', cellAttributes: [] },
  { value: 'fatGrams', cellAttributes: [] }
]

const DbManage = () => {
  const [foodList, setFoodList] = useState([])
  const [selected, setSelected] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchMyAPI()
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveFoodList('')
    let transformed = response.map(item => {
      let { id, ...data } = item
      return { id, data }
    })
    setFoodList(transformed)
  }

  const addFoodItem = async foodItem => {
    await postFoodItem(foodItem)
  }
  
  const handleRowSelect = event => {
    let id = event.target.id
    let currSelected = [...selected]
    currSelected.push(id)
    setSelected(currSelected)
  }

  const handleDeleteSelected = async () => {
    let list = []
    let message = `Deleting these items: ${selected}`
    alert(message)
    await selected.forEach( async item => {
      list = removeItemById(item, foodList)
      await deleteFoodItem(item)
    })
    setFoodList(list)
    setSelected([])
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleAddRow = () => {
    setShowModal(true)
  }

  const handleFormSubmit = async values => {
    console.log(values)
    await addFoodItem(values)
    toggleModal()
    await fetchMyAPI()
  }

  return (
    <div className={styles.container}>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <Form onSubmit={handleFormSubmit} />
      </Modal>
      <br />
      {foodList.length > 0 ? (
        <EditableTable
          headers={foodItemHeaders}
          rows={foodList}
          onSelect={handleRowSelect}
          onDeleteSelected={handleDeleteSelected}
          onAddRow={handleAddRow}
        />
      ) : null}
    </div>
  )
}

export default DbManage
