import styled from "styled-components/native";

const H4 = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.md}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export default H4;