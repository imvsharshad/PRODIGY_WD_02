import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(seconds => (seconds + 1) % 60);
        if (seconds === 59) { 
          setMinutes(minutes => minutes + 1);
        }
        if (minutes === 59) {
          setMinutes(0);
          setHours(hours => hours + 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, seconds]); 

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleLap = () => {
    setLaps([...laps, `${hours} : ${minutes} : ${seconds}`]);
  };

  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setLaps([]);
    setIsRunning(false);
  };
  return (
    <div className='container'>
      <div className="main">
        <div className="title">StopWatch</div>
        <div className='hrs num d-inline'>
          {hours.toString()}
          <div className="hours d-inline"> hrs</div>
        </div>
        <div className='mins num d-inline'>
          {minutes.toString()} 
          <div className="minutes d-inline"> mins</div>
        </div>
        <div className='sec num d-inline'>
          {seconds.toString()}
          <div className="seconds d-inline"> sec</div>
        </div>

        <div className='btns'>
          <button onClick={handleStart} className='start button'>Start</button>
          <button onClick={handleStop} className='stop button'>Stop</button>
          <button onClick={handleLap} className='lap button'>Lap</button>
          <button onClick={handleReset} className='reset button'>Reset</button>
        </div>
        <div className='timestamp-main'>
          {laps.map((lap, index) => (
            <div key={index} className='timestamp'>Lap {index + 1} -  {lap}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;