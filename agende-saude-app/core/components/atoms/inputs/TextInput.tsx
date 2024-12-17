import React, { useState } from "react";
import { InputProps } from "@/core/vo/types/components.props";
import styled from "styled-components/native";

const StyledTextInput = styled.TextInput<{ isFocused: boolean }>` 
    padding: 8px;
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    border: 1px solid 
        ${({ theme, isFocused }) => isFocused ? theme.colors.primary : theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.md}px;
`;

const TextInput: React.FC<InputProps> = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <StyledTextInput
            {...props}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
                setIsFocused(false);
                props.onBlur?.();
            }}
        />
    );
};

export default TextInput;