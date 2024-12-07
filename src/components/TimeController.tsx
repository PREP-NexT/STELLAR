import { useState, useEffect } from 'react';
import { useSimulation } from './SimulationProvider';
import styles from '../styles/TimeController.module.css';

export default function TimeController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentYear, setCurrentYear } = useSimulation();

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentYear((year: number) => {
          const nextYear = year + 1;
          return nextYear > 9 ? 0 : nextYear;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, setCurrentYear]);

  const handlePrevYear = () => {
    setCurrentYear((year) => {
      const prevYear = year - 1;
      return prevYear < 0 ? 9 : prevYear;
    });
  };

  return (
    <div className={styles['time-controller']}>
      <div className={styles['button-group']}>
        <button 
          onClick={handlePrevYear}
          className={styles['control-button']}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l-7-7 7-7M19 19l-7-7 7-7"/>
          </svg>
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={styles['control-button']}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21"/>
            </svg>
          )}
        </button>
      </div>
      <div className={styles['slider-container']}>
        <input 
          type="range" 
          min={0} 
          max={9}
          value={currentYear}
          onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          className={styles['time-slider']}
        />
        <div className={styles['year-label']}>Year {currentYear + 1}</div>
      </div>
    </div>
  );
} 