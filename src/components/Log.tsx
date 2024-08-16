
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


function generateLine(): {
  text: string;
  action: string;
} {
  const ip = getRandomIP();
  const userAgent = getUserAgent();
  const action = getAction();

  if (action === 'BLOCKED' && !bleep?.isPlaying) {
    bleep?.play();
  }

  return {
    text: `IP: ${ip} User-agent: ${userAgent}`,
    action
  };
}

function getAction(): string {
  return Math.random() < 0.5 ? 'BLOCKED' : 'ALLOWED';
}

export const Log = (): ReactElement => {
  const [texts, setTexts] = useState<any[]>([]);

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
            {texts.map((item, index) => (
              < Animator key={index} >
                <Text>{item.text}...
                  <span
                    className='action'
                    style={{
                      color: item.action === 'BLOCKED' ? 'red' : 'green'
                    }}>{item.action}
                  </span></Text>
              </Animator>
            ))}
          </Animator>
        </Animator>
      </div>
    </div >
  );
};