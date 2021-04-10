// const ENVIRONMENT = process.env.NODE_ENV
const ENVIRONMENT = process.env.REACT_APP_ENV || 'prod'

const prodURL = 'https://wu5g3e1p98.execute-api.us-east-1.amazonaws.com/prod'
const devURL = 'https://wu5g3e1p98.execute-api.us-east-1.amazonaws.com/prod'
const localURL  = 'http://localhost:3030'

const getBaseURL = () => {
    console.log(ENVIRONMENT)
    if (ENVIRONMENT === 'prod' || ENVIRONMENT === 'production') return prodURL
    if (ENVIRONMENT === 'dev' || ENVIRONMENT === 'development') return devURL
    return localURL
}

export const config = {
    baseURL: getBaseURL()
}
