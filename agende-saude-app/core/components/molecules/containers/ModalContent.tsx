import styled from "styled-components/native";

const ModalContent = styled.View`
    margin: 20px 20px;
    padding: 20px;
    gap: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.border.md}px;
`;

export default ModalContent;