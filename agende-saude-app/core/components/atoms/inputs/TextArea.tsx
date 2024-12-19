import React, { useState } from "react";
import styled from "styled-components/native";
import { Controller } from "react-hook-form";
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

const ErrorText = styled.Text`
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSizes.xxxs}px;
    margin-top: 4px;
`;

const TextArea: React.FC<{
    name: string;
    control: any;
    rules?: object;
    label: string;
    defaultValue?: string;
}> = ({ name, control, rules, label, defaultValue }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || ""}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormField>
                    <InputLabel isFocused={isFocused || !!value}>{label}</InputLabel>
                    <StyledTextArea
                        value={value}
                        onChangeText={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            onBlur();
                        }}
                        isFocused={isFocused}
                        multiline
                    />
                    {error && <ErrorText>{error.message}</ErrorText>}
                </FormField>
            )}
        />
    );
};

export default TextArea;