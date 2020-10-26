import React, { Component } from 'react'
import './App.css'
import ThemedContent from './components/ThemedContent'
import ThemeProvider from './context/ThemeProvider'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const useUser = () => {
  Auth.currentAuthenticatedUser({
  // bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => {
      if (!user){
          console.log('no user')
          // navigate("/login")
          return undefined
      }else{
          console.log(user)
          console.log("User is logged-in");
          return user
      }
  }).catch(err => {
          console.log('in useEffect - catch')
          console.log("Couldn't get the logged-in user for some reason: " + err);
          // navigate("/login")
          return undefined
      }
  )
}

class App extends Component {

  render() {
    const user = useUser()
    console.log(user)
    return (
      <AmplifyAuthenticator>
      <ThemeProvider>
        <ThemedContent />
      </ThemeProvider>
      </AmplifyAuthenticator> 
    )
  }
}

export default App
