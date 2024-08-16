
/** @jsxImportSource @emotion/react */
import { type ReactElement } from 'react';
import { FrameSVGCorners } from '@arwes/react-frames';
import { Line } from '@ant-design/plots';


const DemoArea = () => {
  let x = 1;
  const config = {
    theme: "classicDark",
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
      transform: [
        {
          type: 'map',
          callback: (row: any) => {
            return {
              ...row,
              // generate time with 1 hour interval
              date: new Date(new Date('2024-08-14').getTime() + (x++) * 500 * 3600),
              'Response Time': row.nlp,
              'Requests': row.blockchain,
            };
          },
        },
        {
          type: 'fold',
          fields: ['Response Time', 'Requests'],
          key: 'type',
          value: 'value',
        },
      ],
    },
    xField: (d: any) => new Date(d.date),
    yField: 'value',
    colorField: 'type',
    axis: {
      x: { labelAutoHide: 'greedy' },
    },
  };

  return <Line {...config} />;
};
// Requests/Response Time Over The Last 24 Hours
export const Chart = (): ReactElement => {
  return (
    <div style={{
      width: "100%",
      height: 200
    }}>
      <FrameSVGCorners
        css={{
          '[data-name=bg]': {
            color: 'hsl(180, 75%, 10%)'
          },
          '[data-name=line]': {
            display: 'none'
          }
        }}
      />
      <DemoArea />
    </div>
  );
};