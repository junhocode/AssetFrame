'use client';
 
import * as React from 'react';
import { motion, type HTMLMotionProps, type Transition } from 'motion/react';
 
import {
  SlidingNumber,
  type SlidingNumberProps,
} from '@/components/ui/shadcn-io/sliding-number/index';
import { Button } from '../../button';
import { cn } from '@/lib/utils';
 
type CounterProps = HTMLMotionProps<'div'> & {
  number: number;
  setNumber: (number: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
  slidingNumberProps?: Omit<SlidingNumberProps, 'number'>;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick'>;
  transition?: Transition;
};
 
function Counter({
  number,
  setNumber,
  className,
  min,
  max,
  slidingNumberProps,
  disabled = false,
  buttonProps,
  transition = { type: 'spring', bounce: 0, stiffness: 300, damping: 30 },
  ...props
}: CounterProps) {

  const handleDecrement = () => {
    setNumber(Math.max(min, number - 1));
  };

  const handleIncrement = () => {
    setNumber(Math.min(max, number + 1));
  };

  return (
    <motion.div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        'flex items-center gap-x-2 p-1 rounded-xl ',
        className,                 
      )}
      {...props}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon-sm"
          {...buttonProps}
          onClick={handleDecrement}
          disabled={ disabled || number < min }
          className={cn(
            'bg-white dark:bg-neutral-950 hover:bg-white/70 dark:hover:bg-neutral-950/70 text-neutral-950 dark:text-white text-2xl font-light pb-[3px]',
            buttonProps?.className,
          )}
        >
          -
        </Button>
      </motion.div>
 
      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn('text-md', slidingNumberProps?.className)}
      />
 
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon-sm"
          {...buttonProps}
          onClick={handleIncrement}
          disabled={ disabled || number > max }
          className={cn(
            'bg-white dark:bg-neutral-950 hover:bg-white/70 dark:hover:bg-neutral-950/70 text-neutral-950 dark:text-white text-3xl font-light pb-[3px]',
            buttonProps?.className,
          )}
        >
          +
        </Button>
      </motion.div>
    </motion.div>
  );
}
 
export { Counter, type CounterProps };