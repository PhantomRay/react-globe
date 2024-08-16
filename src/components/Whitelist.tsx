
/** @jsxImportSource @emotion/react */
import { type ReactElement, useState, useEffect } from 'react';
import { Animator } from '@arwes/react-animator';
import { FrameSVGNefrex, } from '@arwes/react-frames';

const Frame = (): ReactElement => {
  return (
    <div
      css={{
        position: 'relative',
        width: 250,
        height: 100,
        '[data-name=bg]': {
          color: 'hsl(180, 75%, 10%)'
        },
        '[data-name=line]': {
          color: 'hsl(180, 75%, 50%)'
        }
      }}
    >
      <FrameSVGNefrex />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          fontSize: '0.8rem',
          transform: 'translate(-50%, -50%)',
          color: 'hsl(180, 75%, 50%)',
          textAlign: 'center',
        }}
      >
        <h2>Whitelist: 10</h2>
      </div>
    </div>
  );
};

export const Whitelist = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active}>
      <Frame />
    </Animator>
  );
};

