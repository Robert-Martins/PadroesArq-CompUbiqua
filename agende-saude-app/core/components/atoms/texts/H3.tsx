import styled from "styled-components/native";

const H3 = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.lg}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export default H3;