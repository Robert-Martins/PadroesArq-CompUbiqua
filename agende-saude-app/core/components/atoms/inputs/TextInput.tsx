import React, { useState } from "react";
import { InputProps } from "@/core/vo/types/components.props";
import styled from "styled-components/native";
import { FormField } from "../../molecules";
import { InputLabel } from "../texts";
import { useTheme } from "styled-components";
import { handleFormFieldIconColor } from "@/core/utils/components.utils";
import { InputIcon } from "../icons";
import { Controller } from "react-hook-form";
import { Text } from "react-native";

const StyledTextInput = styled.TextInput<{ isFocused: boolean }>` 
    width: 100%;
    padding: ${({ icon }) => (icon ? "8px 8px 8px 32px" : "8px")};
    color: ${({ editable, theme }) => theme.colors[editable ? "text" : "disabled"]};
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    border: 1px solid 
        ${({ theme, isFocused }) =>
          isFocused ? theme.colors.primary : theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.lg}px;
`;

const ErrorText = styled(Text)`
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSizes.xxxs}px;
    margin-top: 4px;
`;

const TextInput: React.FC<
    InputProps & {
        name: string;
        control: any;
        rules?: object;
        defaultValue?: string;
    }
> = (props) => {
    const { label, icon, editable, name, control, rules, defaultValue } = props;

    const [isFocused, setIsFocused] = useState(false);

    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || ""}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormField>
                    <InputLabel isFocused={isFocused || !!value}>{label}</InputLabel>
                    {icon && (
                        <InputIcon
                            name={icon}
                            size={20}
                            color={handleFormFieldIconColor(
                                { ...props, isFocused },
                                theme
                            )}
                        />
                    )}
                    <StyledTextInput
                        value={value}
                        onChangeText={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            onBlur();
                        }}
                        editable={editable ?? true}
                        isFocused={isFocused}
                        {...props}
                    />
                    {error && <ErrorText>{error.message}</ErrorText>}
                </FormField>
            )}
        />
    );
};

export default TextInput;