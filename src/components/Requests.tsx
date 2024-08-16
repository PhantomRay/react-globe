
/** @jsxImportSource @emotion/react */
import { type ReactElement } from 'react';
import { FrameSVGCorners } from '@arwes/react-frames';

export const Requests = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 600,
      height: 250
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
    </div>
  );
};