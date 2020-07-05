/** @jsx jsx */
import { jsx } from '@emotion/core'
import { styles } from '../styles/ProgramStyles'
import ThemeContext from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

// Expects props:
//   item = {
//     id: id,
//     name: name
//   },
//   deleteItem(),
//   editItem()
const BlockHeader = props => {
  let context = useContext(ThemeContext)
  let { blockHeader } = styles(context.theme)
  const renderIcons = ({ editItem, deleteItem, selectItem, ...props }) => {
    let id = props.item.id
    let icons = []
    if (selectItem) {
      icons.push(
        <FontAwesomeIcon
          key={`${id}-${Math.random()}`}
          alt={'select workout'}
          id={id}
          style={{ marginLeft: '10px', float: 'right' }}
          icon={faCheck}
          onClick={selectItem}
        />
      )
    }
    if (editItem) {
      icons.push(
        <FontAwesomeIcon
          key={`${id}-${Math.random()}`}
          alt={'edit workout'}
          id={id}
          style={{ marginLeft: '10px', float: 'right' }}
          icon={faEdit}
          onClick={editItem}
        />
      )
    }
    if (deleteItem) {
      icons.push(
        <FontAwesomeIcon
          key={`${id}-${Math.random()}`}
          alt={'remove workout from program'}
          id={id}
          style={{ marginLeft: '10px', float: 'right' }}
          icon={faTrashAlt}
          onClick={deleteItem}
        />
      )
    }
    return icons
  }

  return (
    <div css={blockHeader} onClick={props.onClick} style={{maxHeight: '25px'}}>
      {props.item.name ? props.item.name : ''}
      {renderIcons(props)}
    </div>
  )
}

export default BlockHeader
