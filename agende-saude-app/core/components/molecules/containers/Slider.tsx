import React, { useState, useRef } from 'react';
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
    width: ${(props) => (props.active ? 20 : 10)}px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({active, theme}) => (active ? theme.colors.primary : theme.colors.divider)};
    transition: all 0.3s ease;
`;

const Slider: React.FC<SliderProps> = (props) => {

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

    const nextSlide = () => goToSlide((currentSlide + 1) % slideCount);

    const prevSlide = () => goToSlide((currentSlide - 1 + slideCount) % slideCount);

    return (
        <SliderContainer>
            <SliderWrapper style={{ transform: [{ translateX: animatedValue }] }}>
                {React.Children.map(children, (child, index) => (
                    <Slide key={index}>{
                        React.cloneElement(child as React.ReactElement, {
                            nextSlide,
                            prevSlide,
                        })
                    }</Slide>
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
};

export default Slider;