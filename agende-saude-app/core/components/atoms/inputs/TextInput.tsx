import React, { useState } from "react";
import { InputProps } from "@/core/vo/types/components.props";
import styled from "styled-components/native";
import { FormField } from "../../molecules";
import { InputLabel } from "../texts";
import { useTheme } from "styled-components";
import { handleFormFieldIconColor } from "@/core/utils/components.utils";
import { InputIcon } from "../icons";

const StyledTextInput = styled.TextInput<{ isFocused: boolean }>` 
    padding: ${({ icon }) => icon ? '8px 8px 8px 32px' : '8px'};
    color: ${({ editable, theme }) => theme.colors[editable ? 'text' : 'disabled']};
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    border: 1px solid 
        ${({ theme, isFocused }) => isFocused ? theme.colors.primary : theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.md}px;
`;

const TextInput: React.FC<InputProps> = (props) => {
    const { label, icon, onBlur, editable } = props;

    const [isFocused, setIsFocused] = useState(false);

    const theme = useTheme();

    return (
        <FormField>
            <InputLabel isFocused={isFocused}>{label}</InputLabel>
            { icon && <InputIcon name={icon} size={20} color={handleFormFieldIconColor({...props, isFocused}, theme)} /> }
            <StyledTextInput
                {...props}
                editable={editable ?? true}
                isFocused={isFocused}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur?.();
                }}
            />
        </FormField>
    );
};

export default TextInput;