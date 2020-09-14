import React, { useEffect } from 'react'
import {Auth} from "aws-amplify";
import { navigate } from '@reach/router'

const Login = props => {

    // useEffect(() => {
    //     console.log('in useEffect')
    //     Auth.currentAuthenticatedUser({
    //         // bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    //     }).then(user => {
    //         if (!user){
    //             console.log('no user')
    //             navigate("/login")
    //         }else{
    //             console.log(user)
    //             console.log("User is logged-in");
    //         }
    //     }).catch(err => {
    //             console.log('in useEffect - catch')
    //             console.log("Couldn't get the logged-in user for some reason: " + err);
    //             navigate("/login")
    //         }
    //     );
    // })

    return(<div>Login</div>)
}

export default Login;