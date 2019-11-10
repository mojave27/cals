import React, { useState, useEffect } from 'react'
import retrieve from '../../api/retrieveWorkouts'

const Workouts = props => {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    let didCancel = false;
  
    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) { // Ignore if we started fetching something else
        console.log(response);
      }
    }  
  
    fetchMyAPI();
    return () => { didCancel = true; }; // Remember if we start fetching something else
  }, []);

  return <div>Workouts</div>
}

export default Workouts
