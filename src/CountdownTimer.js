import React, { useState, useRef, useEffect } from 'react';
import './CountdownTimer.css'; // Importing CSS file for styling

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(900000); // 15 minutes in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();
  const notificationRef = useRef(null);

  useEffect(() => {
    // Request notification permission on component mount
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          notificationRef.current = true;
        }
      });
    } else {
      notificationRef.current = true;
    }

    return () => {
      // Clear interval and reset notification permission on component unmount
      clearInterval(intervalRef.current);
      notificationRef.current = false;
      Notification.requestPermission();
    };
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          if (notificationRef.current) {
            showNotification();
          }
          alert('Congratulations on completing focus session!');
          return 0;
        }
        return prevTimeLeft - 10;
      });
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(900000); // Reset to 15 minutes
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const showNotification = () => {
    new Notification('Congratulations!', {
      body: 'You have completed your focus session!'
    });
  };

  return (
    <div className="timer-container">
      <h1>Focus Mode</h1>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="button-container">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
