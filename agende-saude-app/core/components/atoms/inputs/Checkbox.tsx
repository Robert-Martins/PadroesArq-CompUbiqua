import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { CheckboxProps } from "@/core/vo/types/components.props";
import { Icon } from "../icons";
import { handleCheckboxColor } from "@/core/utils/components.utils";

const CheckboxContainer = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme, disabled, value }) => handleCheckboxColor({ disabled, value }, theme)};
  border-radius: ${({ theme }) => theme.border.sm}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, disabled, value, checked }) =>
    checked ? handleCheckboxColor({ disabled, value }, theme) : "transparent"};
`;

const Checkbox: React.FC<CheckboxProps> = ({ value = false, editable = true, onValueChange }) => {
    const handlePress = () => {
        if (editable && onValueChange) {
            onValueChange(!value);
        }
    };

    return (
        <CheckboxContainer
            value={value}
            disabled={!editable}
            checked={value}
            activeOpacity={0.7}
            onPress={handlePress}
        >
            {value && <Icon name="check" size={16} color="white" />}
        </CheckboxContainer>
    );
};

export default Checkbox;