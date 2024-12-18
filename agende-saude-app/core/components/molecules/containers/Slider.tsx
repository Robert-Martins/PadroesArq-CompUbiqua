import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SliderProps } from '@/core/vo/types/components.props';

const { width } = Dimensions.get('window');

const SliderContainer = styled.View`
    width: 100%;
    padding: 24px 0;
    overflow: hidden;
`;

const SliderWrapper = styled(Animated.View)<{ slideWidth: number }>`
    flex-direction: row;
    width: ${({ slideWidth, slideCount }) => slideWidth * slideCount}px;
`;

const Slide = styled.View<{ slideWidth: number }>`
    width: ${({ slideWidth }) => slideWidth}px;
`;

const NavigationDots = styled.View`
    width: 100%;
    position: absolute;
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
`;

const Dot = styled.TouchableOpacity<{ active: boolean }>`
    width: ${({ active }) => (active ? 32 : 8)}px;
    height: 8px;
    border-radius: 5px;
    background-color: ${({ active, theme }) =>
        active ? theme.colors.primary : theme.colors.divider};
    transition: all 0.3s ease;
`;

const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<unknown>> = forwardRef((props, ref) => {
    const { children, showNavigation = true } = props;

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideCount = React.Children.count(children);

    const themeSpacing = 16;
    const slideWidth = width - themeSpacing * 2;

    const animatedValue = useRef(new Animated.Value(0)).current;

    const goToSlide = (index: number, callback?: () => void) => {
        if (index >= 0 && index < slideCount) {
            setCurrentSlide(index);
            Animated.timing(animatedValue, {
                toValue: -index * slideWidth,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                if (callback) callback();
            });
        }
    };

    const nextSlide = (callback: () => void) => goToSlide((currentSlide + 1) % slideCount, callback);
    const previousSlide = (callback: () => void) => goToSlide((currentSlide - 1 + slideCount) % slideCount, callback);
    const isLastSlide = () =>  currentSlide === slideCount - 1;
    const isFirstSlide = () =>  currentSlide === 0;

    useImperativeHandle(ref, () => ({
        nextSlide,
        previousSlide,
        isLastSlide,
        isFirstSlide
    }));

    return (
        <SliderContainer>
            <SliderWrapper
                slideWidth={slideWidth}
                slideCount={slideCount}
                style={{ transform: [{ translateX: animatedValue }] }}
            >
                {React.Children.map(children, (child, index) => (
                    <Slide key={index} slideWidth={slideWidth}>
                        {child}
                    </Slide>
                ))}
            </SliderWrapper>
            {showNavigation && (
                <NavigationDots>
                    {Array.from({ length: slideCount }).map((_, index) => (
                        <Dot
                            key={index}
                            active={currentSlide === index}
                            onPress={() => goToSlide(index)}
                        />
                    ))}
                </NavigationDots>
            )}
        </SliderContainer>
    );
});

export default Slider;
