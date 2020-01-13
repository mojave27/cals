/** @jsx jsx */
import { jsx } from '@emotion/core'
import Select from '../inputs/Select'
import {
  meStatsContainer,
  meEnergy,
  meMood,
  meSleep,
  meWeight
} from '../../styles/WoDayStyles'

const MeStats = props => {
  return (
    <div css={meStatsContainer}>
      <div css={meWeight}>
        <div style={{display:'grid', gridTemplateColumns: 'auto auto', border:'1px solid blue'}}>
        <label style={{fontWeight:'700', border:'1px solid yellow', width:'30%'}}>Weight</label>
        <Select options={['1', '2', '3', '4']} />
      </div></div>
      <div css={meEnergy}>energy</div>
      <div css={meSleep}>sleep</div>
      <div css={meMood}>mood</div>
    </div>
  )
}

export default MeStats
