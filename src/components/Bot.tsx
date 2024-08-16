
import { type ReactElement, useState, useEffect } from 'react';
import { getRandomIP, getUserAgent } from '../utils/helper';


export const Bot = (): ReactElement => {
  const isps = ['Telstra Limited', 'Optus', 'iiNET Limited', 'AWS'];
  const locations = ['NSW, Australia', 'QLD, Australia', 'VIC, Australia', 'WA, Australia', 'SA, Australia', 'TAS, Australia', 'NT, Australia', 'ACT, Australia'];


  const agent = getUserAgent();
  const isp = isps[Math.floor(Math.random() * isps.length)];
  const loc = locations[Math.floor(Math.random() * locations.length)];
  const ip = getRandomIP();

  const base = 50;
  const [count3, setCount] = useState(Math.floor(base + Math.random() * (100 - base)));


  useEffect(() => {
    const randomInterval = Math.floor(Math.random() * 3000) + 2000;

    const interval = setInterval(() => {
      setCount(Math.floor(Math.floor(base + Math.random() * (100 - base))));
    }, randomInterval);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="bot-card">
      <div className="card-right">
        <div className="status-bar">
          <span>{ip}</span>
          <span>BOT</span>
        </div>
        <div className="info-box">
          <div className="info-row">
            <span>{agent}</span>
          </div>
          <div className="info-row">
            <span>{isp}</span>
            <span className="small-text">ISP</span>
          </div>
          <div className="info-row">
            <span>{loc}</span>
            <span className="small-text">LOC</span>
          </div>
        </div>
        <div className="progress-bars">
          <div className="progress-bar">
            <div className="progress animated-progressbar" style={{ width: count3 + '%' }}></div>
            <span>{count3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
