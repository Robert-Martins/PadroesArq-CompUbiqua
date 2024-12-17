import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { CheckboxProps } from "@/core/vo/types/components.props";

const CheckboxContainer = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme, disabled }) => 
    disabled ? theme.colors.divider : theme.colors.primary};
  border-radius: ${({ theme }) => theme.border.sm}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, disabled, checked }) =>
    checked ? (disabled ? theme.colors.divider : theme.colors.primary) : "transparent"};
`;

const Checkmark = styled.View`
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Checkbox: React.FC<CheckboxProps> = ({ value = false, disabled = false, onValueChange }) => {
    const handlePress = () => {
        if (!disabled && onValueChange) {
            onValueChange(!value);
        }
    };

    return (
        <CheckboxContainer
            disabled={disabled}
            checked={value}
            activeOpacity={0.7}
            onPress={handlePress}
        >
            {value && <Checkmark />}
        </CheckboxContainer>
    );
};

export default Checkbox;