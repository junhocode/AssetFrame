import ReactDOM from 'react-dom';
import type { ChartTooltipProps } from '@/types/chart.type';
import * as S from './ChartTooltip.styles';

export const ChartTooltip = ({ top, left, candle, time, visible }: ChartTooltipProps) => {
  if (!visible || !candle || !time) {
    return null;
  }

  const price = candle.close;
  const date = new Date((time as number) * 1000);
  const dateStr = date.toLocaleString('ko-KR');

  const tooltipContent = (
    <div
      className={S.tooltipContainer}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div className={S.priceLine}>Price</div>
      <div className={S.priceValue}>{price.toFixed(2)}</div>
      <div className={S.dateLine}>{dateStr}</div>
    </div>
  );

  return ReactDOM.createPortal(tooltipContent, document.body);
};