import styled from "styled-components/native";

const Paragraph = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export default Paragraph;