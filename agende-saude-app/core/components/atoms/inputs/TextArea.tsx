import React, { useState } from "react";
import styled from "styled-components/native";
import { TextAreaProps } from "@/core/vo/types/components.props";
import { FormField } from "../../molecules";
import { InputLabel } from "../texts";

const StyledTextArea = styled.TextInput`
    padding: 8px;
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    border: 1px solid 
        ${({ theme, isFocused }) => isFocused ? theme.colors.primary : theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.md}px;
    color: ${({ theme }) => theme.colors.text};
    text-align-vertical: top;
    height: 120px;
`;

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onValueChange,
  onBlur,
  label
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <FormField>
            <InputLabel isFocused={isFocused}>{label}</InputLabel>
            <StyledTextArea
                placeholder={placeholder}
                value={value}
                onChangeText={onValueChange}
                isFocused={isFocused}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur?.();
                }}
                multiline={true}
            />
        </FormField>
    );
};

export default TextArea;
