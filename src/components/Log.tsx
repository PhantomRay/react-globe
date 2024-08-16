
/** @jsxImportSource @emotion/react */
import { type ReactElement, useState, useEffect, useRef } from 'react';
import { Animator } from '@arwes/react-animator';
import { FrameSVGCorners } from '@arwes/react-frames';
import { Text } from '@arwes/react-text';
import { getRandom, getRandomIP, getUserAgent } from '../utils/helper';
import { createBleep } from '@arwes/bleeps';

let volume = 1;
const bleep = createBleep({
  sources: [
    { src: '/assets/sound/typing.mp3', type: 'audio/mpeg' }
  ],
  volume,
  loop: false
});


function generateLine(): string {
  const ip = getRandomIP();
  const userAgent = getUserAgent();
  const action = getAction();

  if (action === 'BLOCKED' && !bleep?.isPlaying) {
    bleep?.play();
  }

  return `IP: ${ip} User-agent: ${userAgent} ... ${action}`;
}

function getAction(): string {
  return Math.random() < 0.7 ? 'BLOCKED' : 'ALLOWED';
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
    }, getRandom(1000, 5000));

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
              < Animator key={index} >
                <Text>{text.replace(/ALLOWED|BLOCKED/, '')} <span style={{
                  color: text.includes('BLOCKED') ? 'red' : 'green'
                }}>{text.endsWith('BLOCKED') ? 'BLOCKED' : 'ALLOWED'}
                </span></Text>
              </Animator>
            ))}
          </Animator>
        </Animator>
      </div>
    </div >
  );
};