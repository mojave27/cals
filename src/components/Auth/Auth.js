import { Auth } from 'aws-amplify';
import { config as awsConfig } from '../../config/lambdaConfig'

export const getSessionJwt = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return token
}

export const getAxiosConfigWithAuth = async () => {
  const token = await getSessionJwt()
  let config = {        
    headers: {
      Authorization: token
    },
    ...awsConfig
  }
  return config
}