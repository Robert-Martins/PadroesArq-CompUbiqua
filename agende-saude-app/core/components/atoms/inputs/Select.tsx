import React, { useState } from "react";
import styled from "styled-components/native";
import { Modal, TouchableOpacity, FlatList } from "react-native";
import { SelectProps } from "@/core/vo/types/components.props";

const Container = styled.View`
    width: 100%;
`;

const SelectButton = styled.TouchableOpacity`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.md}px;
    justify-content: center;
`;

const SelectedValue = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
`;

const ModalOverlay = styled.View`
    flex: 1;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    margin: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.border.md}px;
    padding: 20px;
`;

const OptionItem = styled.TouchableOpacity`
    padding: 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.divider};
`;

const OptionText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
`;

const Select: React.FC<SelectProps> = ({ value, options, onValueChange }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (selectedValue: string) => {
        onValueChange(selectedValue);
        setIsVisible(false);
    };

    return (
        <Container>
            <SelectButton onPress={() => setIsVisible(true)}>
                <SelectedValue>{value || "Selecione uma opção"}</SelectedValue>
            </SelectButton>

            <Modal transparent visible={isVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <OptionItem onPress={() => handleSelect(item.value)}>
                                    <OptionText>{item.label}</OptionText>
                                </OptionItem>
                            )}
                        />
                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                            <OptionText style={{ color: "white", marginTop: 10, textAlign: "center" }}>
                                Cancelar
                            </OptionText>
                        </TouchableOpacity>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </Container>
    );
};

export default Select;
