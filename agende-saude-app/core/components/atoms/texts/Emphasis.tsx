import styled from "styled-components/native";

const Emphasis = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export default Emphasis;