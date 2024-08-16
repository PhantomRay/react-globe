
import { type ReactElement, useState, useEffect } from 'react';

export const Bot = (): ReactElement => {

  const [count1, setCount1] = useState(Math.floor(30 + Math.random() * 30));
  const [count2, setCount2] = useState(Math.floor(30 + Math.random() * 30));
  const [count3, setCount3] = useState(Math.floor(30 + Math.random() * 30));



  useEffect(() => {
    const interval = setInterval(() => {
      setCount1(Math.floor(Math.floor(30 + Math.random() * 30)));
      setCount2(Math.floor(Math.floor(30 + Math.random() * 30)));
      setCount3(Math.floor(Math.floor(30 + Math.random() * 30)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="sci-fi-card">
      {/* <div className="card-left">
        <div className="big-number">88</div>
      </div> */}
      <div className="card-right">
        <div className="status-bar">
          <span>192.168.1.30</span>
          <span>BOT</span>
        </div>
        <div className="info-box">
          <div className="info-row">
            <span>REASON 1</span>
            <span className="small-text">INFO</span>
          </div>
          <div className="info-row">
            <span>REASON 2</span>
          </div>
        </div>
        <div className="progress-bars">
          <div className="progress-bar">
            <div className="progress animated-width" style={{ width: count1 + '%' }}></div>
            <span>{count1}</span>
          </div>
          <div className="progress-bar">
            <div className="progress animated-width" style={{ width: count2 + '%' }}></div>
            <span>{count2}</span>
          </div>
          <div className="progress-bar">
            <div className="progress animated-width" style={{ width: count3 + '%' }}></div>
            <span>{count3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
