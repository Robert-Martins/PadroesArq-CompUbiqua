import { ConfirmationModalProps } from "@/core/vo/types/components.props";
import { Flex } from "../containers";
import { Divider,  H6, Paragraph, TextButton } from "../../atoms";
import styled from "styled-components";

const StyledConfirmationModalHeader = styled(H6)`
    text-align: center;
`;

const StyledConfirmationModalMessage = styled(Paragraph)`
    text-align: center;
`;

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const { title, message, onCancel, onConfirm } = props;

    return (
        <Flex align="center" gap={16}>
            <StyledConfirmationModalHeader>{ title }</StyledConfirmationModalHeader>
            <StyledConfirmationModalMessage>{ message }</StyledConfirmationModalMessage>
            <Divider />
            <Flex direction="row" justify="center" gap={32}>
                <TextButton type="tertiary" onPress={onCancel}>
                    Cancelar
                </TextButton>
                <TextButton type="primary" onPress={onConfirm}>
                    Confirmar
                </TextButton>
            </Flex>
        </Flex>
    )
}

export default ConfirmationModal;