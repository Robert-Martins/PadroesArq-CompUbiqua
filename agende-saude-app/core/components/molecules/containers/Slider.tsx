import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SliderProps } from '@/core/vo/types/components.props';

const { width } = Dimensions.get('window');

const SliderContainer = styled.View`
    flex: 1;
    overflow: hidden;
`;

const SliderWrapper = styled(Animated.View)`
    flex-direction: row;
    width: ${width * 100}%;
`;

const Slide = styled.View`
    width: ${width}px;
`;

const NavigationDots = styled.View`
    width: 100%;
    position: absolute;
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

const Dot = styled(TouchableOpacity)<{ active: boolean }>`
    width: ${(props) => (props.active ? 36 : 12)}px;
    height: 12px;
    border-radius: 6px;
    background-color: ${({active, theme}) => (active ? theme.colors.primary : theme.colors.divider)};
    transition: all 0.3s ease;
`;

const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<unknown>> = forwardRef((props, ref) => {

    const { children, showNavigation = true } = props;

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideCount = React.Children.count(children);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const goToSlide = (index) => {
        if (index >= 0 && index < slideCount) {
            setCurrentSlide(index);
            Animated.timing(animatedValue, {
                toValue: -index * width,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    };

    useImperativeHandle(ref, () => ({
        nextSlide() {
            goToSlide((currentSlide + 1) % slideCount)
        },
        previousSlide() {
            goToSlide((currentSlide - 1 + slideCount) % slideCount)
        }
    }));

    return (
        <SliderContainer>
            <SliderWrapper style={{ transform: [{ translateX: animatedValue }] }}>
                {React.Children.map(children, (child, index) => (
                    <Slide key={index}>{child}</Slide>
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