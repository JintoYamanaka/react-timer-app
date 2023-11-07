import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [minutes, setMinutes] = useState<string>('0');
  const [seconds, setSeconds] = useState<string>('0');
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      const id = setTimeout(() => {
        setTotalSeconds(totalSeconds - 1);
      }, 1000);
      setIntervalId(id);
    } else if (totalSeconds === 0 && isActive) {
      clearInterval(intervalId as NodeJS.Timeout);
      alert('Time’s up!'); // 実際には効果音を鳴らす
      setIsActive(false); // タイマーを非アクティブ状態
    }
    return () => clearInterval(intervalId as NodeJS.Timeout);
  }, [isActive, totalSeconds]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleStart = () => {
    const totalSec = parseInt(minutes) * 60 + parseInt(seconds);
    if (!isNaN(totalSec) && totalSec > 0) {
      setTotalSeconds(totalSec);
      setIsActive(true);
    } else {
      alert('Invalid time input!');
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTotalSeconds(parseInt(minutes) * 60 + parseInt(seconds));
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 60) {
      setMinutes(e.target.value);
    } else {
      alert('Minutes should be less than 60.');
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 60) {
      setSeconds(e.target.value);
    } else {
      alert('Seconds should be less than 60.');
    }
  };

  return (
    <div className="App">
      <h1>Timer App</h1>
      <input type="number" value={minutes} onChange={handleMinutesChange} placeholder="Minutes" />
      <input type="number" value={seconds} onChange={handleSecondsChange} placeholder="Seconds" />
      <button onClick={handleStart} disabled={isActive}>Start</button>
      <button onClick={toggleActive} disabled={!isActive && totalSeconds === 0}>
        {isActive ? 'Pause' : 'Resume'}
      </button>
      <button onClick={handleReset}>Reset</button>
      <h2>
        Time Remaining: {Math.floor(totalSeconds / 60)}:{totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60}
      </h2>
    </div>
  );
};

export default App;
