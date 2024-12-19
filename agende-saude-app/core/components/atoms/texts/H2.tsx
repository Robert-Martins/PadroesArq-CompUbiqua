import styled from "styled-components/native";

const H2 = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xl}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export default H2;