import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'

const Dashboard = props => {
    return(
      <Card>
        <CardHeader
          title='Dashboard'
        />
        <CardContent>
          <Typography variant='body1'>weight graph</Typography>
          <Typography variant='body1'>average weight workouts per week (last month)</Typography>
          <Typography variant='body1'>most recent weight workouts (titles of last three)</Typography>
          <Typography variant='body1'>average cardio workouts per week (last month)</Typography>
          <Typography variant='body1'>most recent cardio workouts (titles of last three)</Typography>
        </CardContent>
      </Card>
    )
}

export default Dashboard;