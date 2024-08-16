
/** @jsxImportSource @emotion/react */
import { type ReactElement, useState, useEffect, useRef } from 'react';
import { Animator } from '@arwes/react-animator';
import { FrameSVGCorners } from '@arwes/react-frames';
import { Text } from '@arwes/react-text';
import { getRandomIP, getUserAgent } from '../utils/helper';

function generateLine(): string {
  // sample: IP: <IP> User-agent: <user-agent> ... <BLOCED | ALLOWED>
  const ip = getRandomIP();
  const userAgent = getUserAgent();
  return `IP: ${ip} User-agent: ${userAgent} ... ${getAction()}`;
}

function getAction(): string {
  return Math.random() < 0.5 ? 'BLOCKED' : 'ALLOWED';
}

export const Log = (): ReactElement => {
  const [texts, setTexts] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTexts(prevTexts => [
        ...prevTexts,
        generateLine(),
      ]);
    }, 1000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [texts]);

  return (
    <div style={{
      width: 1020,
      height: 350
    }}>
      <FrameSVGCorners
        css={{
          '[data-name=bg]': {
            color: 'hsl(180, 75%, 10%)'
          },
          '[data-name=line]': {
            color: 'hsl(180, 75%, 50%)'
          }
        }}
      />
      <div className='output' style={{
        color: 'hsl(180, 75%, 50%)',
        overflowY: 'auto',
        height: '350px'
      }}
        ref={containerRef}
      >
        <Animator active={true} combine manager='sequence'>
          <Animator>
            {texts.map((text, index) => (
              <Animator key={index}>
                <Text>{text}</Text>
              </Animator>
            ))}
          </Animator>
        </Animator>
      </div>
    </div>
  );
};