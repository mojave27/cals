import React, { Component } from 'react'
import './App.css'
import ThemedContent from './components/ThemedContent'
import ThemeProvider from './context/ThemeProvider'
// import { config } from './config/config'
// import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
// import Amplify, { Auth } from 'aws-amplify'
// import awsconfig from './aws-exports'
// import mockUser from 'mocks/mockUser'
// Amplify.configure(awsconfig)

/*
 * TODO: the app is AWS centric in terms of auth, and the lambdaConfig used in apis.  
 * Update to allow us to trigger different auth sources and api urls based on 
 * environment and or target platform
 */

// const useUser = () => {
//   if (config.auth === true) {
//   return Auth.currentAuthenticatedUser({
//     // bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
//   })
//     .then(user => {
//       if (!user) {
//         console.log('no user')
//         return undefined
//       } else {
//         console.log('User is logged-in')
//         return user
//       }
//     })
//     .catch(err => {
//       console.log('in useUser - catch')
//       console.log("Couldn't get the logged-in user: " + err)
//       // navigate("/login")
//       return undefined
//     })
//   }else{
//     console.log('returning mock user')
//     return Promise.resolve(mockUser)
//   }
// }

// const getUserGroups = user => {
//   if (user !== undefined) {
//     const groups = user.signInUserSession.idToken.payload['cognito:groups']
//     console.log(`user groups: ${JSON.stringify(groups)}`)
//     return groups
//   } else {
//     return []
//   }
// }

class App extends Component {
  // componentDidMount = async () => {
    // let user = await useUser()
    // console.log(user)
    // this.setState({ user: user})
  // }

  render() {
    return (
      // <AmplifyAuthenticator>
        <ThemeProvider>
          {/* <ThemedContent user={this.state.user} groups={getUserGroups(this.state.user)} /> */}
          <ThemedContent />
        </ThemeProvider>
      // </AmplifyAuthenticator>
    )
  }
}

export default App
