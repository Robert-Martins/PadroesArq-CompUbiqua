import React from "react";
import styled from "styled-components/native";
import { ToggleProps, ToggleButtonProps } from "@/core/vo/types/components.props";

const ToggleContainer = styled.View`
    flex-direction: row;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.md}px;
    overflow: hidden;
`;

const ToggleButton = styled.TouchableOpacity<ToggleButtonProps>`
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, isSelected }) =>
        isSelected ? theme.colors.primary : theme.colors.white};
    border-color: ${({ theme, isSelected }) => isSelected ? theme.colors.primary : theme.colors.divider};
    border-top-left-radius: ${({ theme, isLeft }) =>
        isLeft ? theme.border.md : 0}px;
    border-bottom-left-radius: ${({ theme, isLeft }) =>
        isLeft ? theme.border.md : 0}px;
    border-top-right-radius: ${({ theme, isRight }) =>
        isRight ? theme.border.md : 0}px;
    border-bottom-right-radius: ${({ theme, isRight }) =>
        isRight ? theme.border.md : 0}px;
`;

const ToggleText = styled.Text<ToggleButtonProps>`
    color: ${({ theme, isSelected }) =>
        isSelected ? theme.colors.white : theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

const Toggle: React.FC<ToggleProps> = ({ value, options, onValueChange }) => {
  return (
    <ToggleContainer>
        {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
                <ToggleButton
                    key={option.value}
                    isSelected={isSelected}
                    isLeft={index === 0}
                    isRight={index === options.length - 1}
                    onPress={() => onValueChange(option.value)}
                >
                    <ToggleText isSelected={isSelected}>{option.label}</ToggleText>
                </ToggleButton>
            );
        })}
    </ToggleContainer>
  );
};

export default Toggle;