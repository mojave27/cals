/** @jsx jsx */
import { jsx } from '@emotion/core'
import { blockHeader } from '../styles/program'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const BlockHeader = props => {
  return (
    <div css={blockHeader}>
      {props.item.id}
      {/* {props.item.name ? props.item.name : ''} */}
      <FontAwesomeIcon
        alt={'remove workout from program'}
        id={props.item.id}
        style={{ marginLeft: '10px', float: 'right' }}
        icon={faTrashAlt}
        onClick={props.deleteItem}
      />
      <FontAwesomeIcon
        alt={'edit workout'}
        id={props.item.id}
        style={{ marginLeft: '10px', float: 'right' }}
        icon={faEdit}
        onClick={props.editItem}
      />
    </div>
  )
}

export default BlockHeader