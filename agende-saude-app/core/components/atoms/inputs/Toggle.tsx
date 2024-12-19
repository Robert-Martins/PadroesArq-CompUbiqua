import React from "react";
import styled from "styled-components/native";
import { ToggleProps, ToggleButtonProps } from "@/core/vo/types/components.props";
import { handleToggleButtonBackground, handleToggleButtonBorder } from "@/core/utils/components.utils";

const ToggleContainer = styled.View`
    flex-direction: row;
    overflow: hidden;
`;

const ToggleButton = styled.TouchableOpacity<ToggleButtonProps>`
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, isSelected, disabled }) => handleToggleButtonBackground({ isSelected, disabled }, theme)};
    border: 1px solid ${({ theme, isSelected, disabled }) => handleToggleButtonBorder({ isSelected, disabled }, theme)};
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

const Toggle = <T,> (props: ToggleProps<T>) => {
    const { value, options, onValueChange, editable = true } = props;

    return (
        <ToggleContainer>
            {options.map((option, index) => {
                const isSelected = option.value === value;
                const isDisabled = !editable;
                return (
                    <ToggleButton
                        key={option.value}
                        isSelected={isSelected}
                        isLeft={index === 0}
                        isRight={index === options.length - 1}
                        onPress={() => !isDisabled && onValueChange(option.value)}
                        disabled={isDisabled}
                    >
                        <ToggleText isSelected={isSelected}>{option.label}</ToggleText>
                    </ToggleButton>
                );
            })}
        </ToggleContainer>
    );
};

export default Toggle;