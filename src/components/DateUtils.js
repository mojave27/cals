export const getReadableDate = () => {
  const timestamp = Number(new Date())
  const date = new Date(timestamp).toDateString()
  return date
}

export const getEpochDate = () => {
  return new Date()
}
