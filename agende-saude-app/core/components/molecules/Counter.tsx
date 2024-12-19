import { formatTime } from '@/core/utils/utils';
import { CounterProps } from '@/core/vo/types/components.props';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Flex } from './containers';
import { Emphasis } from '../atoms';

const Counter: React.ForwardRefExoticComponent<CounterProps & React.RefAttributes<unknown>> = forwardRef((props, ref) => {

    const { milliseconds, onEnd } = props;

    const [timeLeft, setTimeLeft] = useState(milliseconds);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev) => prev - 1000), 1000);
        } else {
            onEnd && onEnd();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, onEnd]);

    useImperativeHandle(ref, () => ({
        reset: () => setTimeLeft(milliseconds),
    }));

    return (
        <Flex align='center'>
            <Emphasis>{formatTime(timeLeft)}</Emphasis>
        </Flex>
    );
});

export default Counter;