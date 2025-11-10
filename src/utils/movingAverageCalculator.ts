import type { MovingAverageFunctionProps } from "@/types/chart.type";

export const calculateMovingAverageSeriesData = ({ candleData, maLength }: MovingAverageFunctionProps) => {
    const maData = [];

    for (let i = 0; i < candleData.length; i++) {
        if (i < maLength - 1) { 
            maData.push({ time: candleData[i].time }); 
        } else {
            let sum = 0;
            for (let j = 0; j < maLength; j++) {
                sum += candleData[i - j].close;
            }
            const maValue = sum / maLength;
            maData.push({ time: candleData[i].time, value: maValue });
        }
    }

    return maData;
}