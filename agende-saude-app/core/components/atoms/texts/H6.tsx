import styled from "styled-components/native";

const H6 = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xs}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export default H6;