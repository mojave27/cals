import * as React from 'react'
import { useEffect } from 'react'


const StopWatch = () => {
  useEffect(() => {
    timer()
  })

  const timer = () => {
    let seconds =  "00"
    let minutes =  "00"
    let hours =  "00"
    setInterval(function() {
      seconds = (Number(seconds) + 1).toString()
      if (seconds < 10 ) seconds = `0${seconds}`


      document.getElementById('timer').innerHTML = `<h3>${hours}:${minutes}:${seconds}</h3>`

      // if (time.seconds === "59") {
      //   now.seconds = "00"

      //   if (time.minutes === "59") {
      //     now.minutes = "00"
      //     now.hours = (Number(time.hours) + 1).toString()
      //   }else{
      //     now.minutes = (Number(time.minutes) + 1).toString()
      //   }
      // } else {
      //   now.seconds = (Number(time.seconds) + 1).toString()
      // }
      // console.log(JSON.stringify(now))


    }, 1000)
  }

  // return <div>{`${time.hours}:${time.minutes}:${time.seconds}`}</div>
  return <div id='timer'><h3>{'00:00:00'}</h3></div>
}

export default StopWatch
