/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
import { styles as programStyles } from '../../styles/ProgramStyles'
import { gridStyles } from '../../styles/gridStyles'
import ThemeContext from '../../context/ThemeContext'
import Table from '../tables/SimpleTable'
import BlockHeader from '../BlockHeader'

const WorkoutCard = props => {
  let themeContext = useContext(ThemeContext)
  let { gridItem } = gridStyles(themeContext.theme)
  const { setBlock, workoutBlock } = programStyles(themeContext.theme)
  const { editItem, deleteItem, key, id, item } = props

  const handleClick = () => {
    if (props.onClick) props.onClick(id)
  }

  const renderExerciseGroups = exerciseGroups => {
    if (exerciseGroups !== undefined && exerciseGroups.length > 0){
      return exerciseGroups.map((exGroup, index) => {
        let data = {
          headers: ['name', 'reps'],
          rows: [...exGroup.exercises]
        }
        return (
          <div key={`${exGroup.id}-${index}`} css={setBlock}>
            <Table data={data} disabled={true} />
          </div>
        )
      })
    }else{
      return null
    }


  }

  return (
    <div
      key={key}
      id={id}
      css={[workoutBlock, gridItem]}
      style={{ marginLeft: '5px', marginBottom: '10px' }}
      onClick={handleClick}
    >
      <BlockHeader
        item={item}
        deleteItem={deleteItem}
        editItem={editItem}
        onClick={handleClick}
      />
      <div>{renderExerciseGroups(item.exerciseGroups)}</div>
    </div>
  )
}

export default WorkoutCard
