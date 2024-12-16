import styled from "styled-components/native";

const H1 = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xxl}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export default H1;