import React, { Component } from 'react'
import './App.css'
import ThemedContent from './components/ThemedContent'
import ThemeProvider from './context/ThemeProvider'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'
// Amplify.configure(awsconfig)
Amplify.configure({ ...awsconfig, ssr: true });

const useUser = () => {
  return Auth.currentAuthenticatedUser({
    // bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then(user => {
      if (!user) {
        console.log('no user')
        return undefined
      } else {
        console.log('User is logged-in')
        return user
      }
    })
    .catch(err => {
      console.log('in useUser - catch')
      console.log("Couldn't get the logged-in user for some reason: " + err)
      // navigate("/login")
      return undefined
    })
}

const getUserGroups = user => {
  if (user !== undefined) {
    const groups = user.signInUserSession.idToken.payload['cognito:groups']
    console.log(`user groups: ${JSON.stringify(groups)}`)
    return groups
  } else {
    return []
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = async () => {
    let user = await useUser()
    this.setState({ user: user})
  }

  render() {
    return (
      <AmplifyAuthenticator>
        <ThemeProvider>
          <ThemedContent user={this.state.user} groups={getUserGroups(this.state.user)} />
        </ThemeProvider>
      </AmplifyAuthenticator>
    )
  }
}

export default App
