import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Controller } from "react-hook-form";
import { FormField } from "../../molecules";
import { InputLabel } from "../texts";
import { useModal } from "@/core/contexts/modal.provider";
import { InputIcon } from "../icons";
import { handleFormFieldIconColor } from "@/core/utils/components.utils";
import { useTheme } from "styled-components";
import { AppIcon } from "@/core/vo/types/components.props";

const SelectButton = styled.TouchableOpacity`
    padding: ${({ icon }) => icon ? '8px 8px 8px 32px' : '8px'};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.md}px;
    justify-content: center;
`;

const SelectedValue = styled.Text<{ disabled: boolean }>`
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
`;

const OptionItem = styled.TouchableOpacity`
    padding: 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.divider};
`;

const OptionText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

const ErrorText = styled.Text`
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSizes.xxxs}px;
    margin-top: 4px;
`;

const OptionList = <T,>({ options, onSelect }: { options: any[]; onSelect: (val: T) => void }) => {
    return (
        <FlatList
            data={options}
            keyExtractor={(item) => String(item.value)}
            renderItem={({ item }) => (
                <OptionItem onPress={() => onSelect(item.value)}>
                    <OptionText>{item.label}</OptionText>
                </OptionItem>
            )}
        />
    );
};

const Select = <T,>({
    name,
    control,
    rules,
    label,
    options,
    defaultValue,
    editable,
    icon
}: {
    name: string;
    control: any;
    rules?: object;
    label: string;
    options: { label: string; value: T }[];
    defaultValue?: T;
    editable?: boolean;
    icon?: AppIcon;
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const { displayModal, closeModal } = useModal();
    const theme = useTheme();

    const getLabelByValue = (val: T | null) => {
        const option = options.find((opt) => opt.value === val);
        return option ? option.label : "Selecione uma opção";
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormField>
                    <InputLabel>{label}</InputLabel>
                    {icon && (
                        <InputIcon
                            name={icon}
                            size={20}
                            color={handleFormFieldIconColor({ editable, isFocused }, theme)}
                        />
                    )}
                    <SelectButton
                        onPress={() => {
                            setIsFocused(true);
                            displayModal({
                                modal: (props: any) => <OptionList {...props} />,
                                header: label,
                                showCloseButton: true,
                                modalProps: {
                                    options,
                                    onSelect: (val: T) => {
                                        onChange(val);
                                        closeModal();
                                        setIsFocused(false);
                                    },
                                },
                            });
                        }}
                        icon={icon}
                        disabled={!editable}
                    >
                        <SelectedValue disabled={!editable}>
                            {value ? getLabelByValue(value) : "Selecione uma opção"}
                        </SelectedValue>
                    </SelectButton>
                    {error && <ErrorText>{error.message}</ErrorText>}
                </FormField>
            )}
        />
    );
};

export default Select;