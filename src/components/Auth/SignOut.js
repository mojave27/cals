import React from 'react'
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';

async function signOut() {
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const SignOut = props => {
  return(
    <Button color="inherit" onClick={signOut}>Logout</Button>
  )
}

export default SignOut