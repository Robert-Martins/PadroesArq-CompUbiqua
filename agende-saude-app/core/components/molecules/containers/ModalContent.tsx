import styled from "styled-components/native";

const ModalContent = styled.View`
    flex: 1;
    margin: 20px 20px;
    padding: 20px;
    gap: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.border.md}px;
`;

export default ModalContent;