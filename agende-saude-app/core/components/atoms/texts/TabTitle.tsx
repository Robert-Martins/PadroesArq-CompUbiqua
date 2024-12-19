import styled from "styled-components/native";

const TabTitle = styled.Text`
    width: 100%;
    padding: 10px 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.semiBold};
    text-align: center;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.disabled};
`;

export default TabTitle;