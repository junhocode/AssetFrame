import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries, type Time, type LineData } from 'lightweight-charts';

interface ChartComponentProps {
  data: LineData<Time>[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

export const Chart: React.FC<ChartComponentProps> = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (!chartContainerRef.current) {
              return;
            }

            const handleResize = () => {
                if (chartContainerRef.current) {
                  chart.applyOptions({ width: chartContainerRef.current.clientWidth });
                }
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, { 
              lineColor, 
              topColor: areaTopColor, 
              bottomColor: areaBottomColor 
            });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
            className='w-full h-full'
        />
    );
};