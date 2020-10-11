import React from 'react'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const Login = props => {
    return(
        <AmplifyAuthenticator>
        <div>
          <AmplifySignOut />
        </div>
      </AmplifyAuthenticator> 
    )
}

export default Login;