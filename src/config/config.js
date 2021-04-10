const ENVIRONMENT = process.env.REACT_APP_ENV || 'prod'

const useAuth = () => {
  switch (ENVIRONMENT) {
    case 'prod':
      console.log('env is prod, returning true')
      return true 
    case 'dev':
      console.log('env is dev, returning true')
      return true
    case 'local':
      console.log('env is local, returning fasle')
      return false
    default:
      break;
  }
}

export const config = {
  auth: useAuth()
}
