import { useRef, useEffect, memo } from 'react';
import { KktproKeys } from '@kkt/pro';
import * as echarts from 'echarts';
import { pieLeftConfig } from './utils/pie';

export interface EchartsData extends KktproKeys {
  name: string;
  value: number;
}

type Type = 'pieLeft';

export interface EChartProps extends KktproKeys  {
  width?: number | string,
  height?: number | string;
  type?: Type;
  data?: EchartsData[];
}

const Echarts = (props: EChartProps) => {
  const {
    data = [],
    width = '100%',
    height = '100%',
    type = 'line',
  } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  let myChart: echarts.ECharts | null = null;

  const options: KktproKeys = {
    pieLeft: pieLeftConfig(data),
  }

  useEffect(() => {
    if (chartRef.current) {
      if (myChart) {
        echarts.dispose(chartRef.current);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      myChart = echarts.init(chartRef.current);
      window.addEventListener('resize', () => myChart?.resize());
      const option = options[type];
      myChart.setOption(option, true);
    }
    return () => {
      window.removeEventListener('resize', () => {
        myChart?.resize()
      });
      myChart?.dispose();
      myChart = null;
    }
  }, [data, chartRef]);

  return (
    <div ref={chartRef} style={{ width, height }} />
  )
}

export default memo(Echarts);