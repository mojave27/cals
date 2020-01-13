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
    // <div css={meStatsContainer}>
    <div>
      <div css={meWeight}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <label style={{ fontWeight: '700', width:'12%' }}>Weight</label>
          <Select jssClass={{float:'left'}} options={['1', '2', '3', '4']} />
          <div css={meEnergy} style={{width:'70%'}}>energy</div>
        </div>
      </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            border: '1px solid green',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
      <div css={meSleep} style={{width:'50%'}}>sleep</div>
      <div css={meMood} style={{width:'50%'}}>mood</div>
    </div>
    </div>
  )
}

export default MeStats
