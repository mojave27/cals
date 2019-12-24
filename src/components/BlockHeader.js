/** @jsx jsx */
import { jsx } from '@emotion/core'
import { blockHeader } from '../styles/program'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// Expects props:
//   item = {
//     id: id,
//     name: name
//   },
//   deleteItem(),
//   editItem()
const BlockHeader = props => {
  const renderIcons = ({ editItem, deleteItem, ...props }) => {
    let id = props.item.id
    let icons = []
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
    <div css={blockHeader}>
      {props.item.name ? props.item.name : ''}
      {renderIcons(props)}
    </div>
  )
}

export default BlockHeader
