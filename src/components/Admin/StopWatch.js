import * as React from 'react'
import { useEffect, useState } from 'react'

const timeObj = {
  hours: "00",
  minutes: "00",
  seconds: "00"
}

const StopWatch = () => {
  const [time, setTime] = useState(timeObj)
  useEffect(() => {
    timer()
  })

  const timer = () => {
    setInterval(function() {
      let now = {}

      if (time.seconds === "59") {
        now.seconds = "00"

        if (time.minutes === "59") {
          now.minutes = "00"
          now.hours = (Number(time.hours) + 1).toString()
        }else{
          now.minutes = (Number(time.minutes) + 1).toString()
        }
      } else {
        now.seconds = (Number(time.seconds) + 1).toString()
      }
      console.log(JSON.stringify(now))
      setTime(now)
    }, 1000)
  }

  return <div>{`${time.hours}:${time.minutes}:${time.seconds}`}</div>
}

export default StopWatch
