import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { SelectionListProps, SelectProps } from "@/core/vo/types/components.props";
import { FormField } from "../../molecules";
import { InputLabel } from "../texts";
import { useModal } from "@/core/contexts/modal.provider";
import { InputIcon } from "../icons";
import { handleFormFieldIconColor } from "@/core/utils/components.utils";
import { useTheme } from "styled-components";

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

const OptionList = <T,> (props: SelectionListProps<T>) => {
    const { options, onSelect } = props;

    return <FlatList
                data={options}
                keyExtractor={(item) => String(item.value)}
                renderItem={({ item }) => (
                    <OptionItem onPress={() => onSelect(item.value)}>
                        <OptionText>{item.label}</OptionText>
                    </OptionItem>
                )}
            />;
}

const Select = <T,>(props: SelectProps<T>) => {
    const { value, options, editable, icon, onValueChange, label } = props;

    const [isFocused, setIsFocused] = useState(false);
    const { displayModal, closeModal } = useModal();
    const theme = useTheme();
    
    const onSelectionChange = (val: T) => {
        onValueChange(val);
        closeModal();
        setIsFocused(false);
    }

    const showOptions = () => {
        displayModal({
            modal: (props: SelectionListProps<T>) => <OptionList {...props} />,
            header: label,
            showCloseButton: true,
            modalProps: {options, onSelect: onSelectionChange}
        });
        setIsFocused(true);
    }

    const getLabelByValue = (val: T) => {
        const option = options.find((opt) => opt.value === val);
        return option ? option.label : "Selecione uma opção";
    }

    return (
        <FormField>
            <InputLabel>{ label }</InputLabel>
            { icon && <InputIcon name={icon} size={20} color={handleFormFieldIconColor({...props, isFocused}, theme)} /> }
            <SelectButton onPress={() => showOptions()} icon={icon} disabled={!editable}>
                <SelectedValue disabled={!editable}>
                    {value ? getLabelByValue(value) : "Selecione uma opção"}
                </SelectedValue>
            </SelectButton>
        </FormField>
    );
};
  
export default Select;