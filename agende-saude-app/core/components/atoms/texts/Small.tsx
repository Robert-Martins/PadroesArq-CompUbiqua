import styled from "styled-components/native";

const Small = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xxxs}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export default Small;