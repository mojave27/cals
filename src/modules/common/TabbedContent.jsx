import React, { useState } from 'react'
import TabPanel from 'components/controls/TabPanel'
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types'
import { Container, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  verticalTabs: {
    width: '100%'
  },
  tabPanel: {
    margin: 'auto',
    padding: '0px',
    '& .MuiBox-root': {
      padding: '10px 0px'
    }
  }
}))

/**
 * 
 * @param {*} props 
 * @param {[]} props.items      - array of items to render in the tab panels
 * @param {*} props.items.item  - object with name and content, where content is a React component
 * @returns 
 */
const TabbedContent = props => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isEmpty(props.items) ? (
    <Spinner />
  ) : (
    <Container>
      <div className={classes.verticalTabs}>
        <Tabs
          orientation='horizontal'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          scrollButtons='auto'
          aria-label='tabs'
        >
          {props.items.map((item, index) => {
            let name = item.name === '' ? `item-${index}` : item.name
            return (
              <Tab label={name} {...a11yProps(index)} key={`tab-${index}`} />
            )
          })}
        </Tabs>
      </div>
      {props.items.map((item, index) => {
        return (
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={index}
            key={`tabpanel-${index}`}
          >
            {item.content}
          </TabPanel>
        )
      })}
    </Container>
  )
}

TabbedContent.propTypes = {
  items: PropTypes.array.isRequired,
  viewOnly: PropTypes.bool
}

TabbedContent.defaultProps = {
  viewOnly: true,
  items: []
}

export default TabbedContent
